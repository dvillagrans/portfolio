import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { CV_DATA } from '@/data/cv';
import { CERTIFICATIONS } from '@/data/certifications';
import { rateLimit, getScopedRequestIdentifier } from '@/lib/rate-limit';
import { readJsonBody } from '@/lib/api-body';
import { selectCvContext } from '@/lib/cv/select';
import { buildSelectedCvContext } from '@/lib/cv/build-context';
import { renderCvMarkdown } from '@/lib/cv/render';
import { enforceCvMetrics } from '@/lib/cv/validate';
import { formatSelectionSummary } from '@/lib/cv/format-selection';
import {
  buildFallbackCvDocument,
  parseCvFromModel,
  type CvParseContext,
} from '@/lib/cv/parse-cv';
import {
  buildCoverLetterSystemPrompt,
  parseCoverLetterFromModel,
  renderCoverLetter,
} from '@/lib/cv/cover-letter';

export const maxDuration = 60;

const CV_RATE_LIMIT = 5;
const CV_WINDOW_MS = 5 * 60 * 1000;

const MIN_JD_LENGTH = 10;
const MAX_JD_LENGTH = 10_000;

// Body limit: job description max 10_000 chars plus JSON overhead and headroom.
const CV_MAX_BODY_BYTES = 32 * 1024;

function deduplicateParagraphs(text: string): string {
  const paragraphs = text.split(/\n\n+/);
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const p of paragraphs) {
    const normalized = p.trim().toLowerCase().replace(/\s+/g, " ");
    if (normalized.length < 20) {
      unique.push(p);
      continue;
    }
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    unique.push(p);
  }

  return unique.join("\n\n");
}

function toCleanJson(value: unknown): string {
  return JSON.stringify(
    value,
    (key, v) => {
      if (key === 'icon' || key === 'logo') return undefined;
      return v;
    },
    2
  );
}

const cleanCerts = JSON.stringify(CERTIFICATIONS, null, 2);

function buildCvSystemPrompt(selectedJson: string, certificationsJson: string): string {
  return `Role:
You are a professional resume writer specializing in one-page tech CVs for early-career engineers.

Objective:
Given a job description and the candidate's resume data, produce a TAILORED ONE-PAGE CV.

Source of Truth (Hard Requirement):
- The canonical data is the SELECTED context JSON below, plus certifications.
- NEVER invent facts, skills, experience, metrics, or achievements not explicitly present in the data.
- If the JD asks for something not in the resume, OMIT it — do not hallucinate.
- NEVER repeat sections or content. Each section appears ONCE.

Instructions:
1. You will receive a selected context JSON with verified project facts and experience bullets.
2. Produce a STRICT JSON object (no Markdown) matching:
{
  "summary": string,
  "skills": Array<{ "category": string, "items": string }>,
  "experience": Array<{ "title": string, "company": string, "dates": string, "bullets": string[] }>,
  "projects": Array<{ "name": string, "description": string, "stack": string, "bullets": string[] }>,
  "certifications": string[]
}
3. Constraints:
   - Experience: 1–3 entries. Projects: 3–4 entries.
   - Every bullet must contain a metric or scale signal (numbers, <500ms, 10K+, $2-3, %).
   - Mirror JD terminology. No dashes as separators in prose.

========
SELECTED CV CONTEXT (JSON):
${selectedJson}
========
CERTIFICATIONS DETAIL:
${certificationsJson}
========`;
}

function buildCvRepairPrompt(validationErrors: string, invalidJson: string): string {
  return `Your previous CV JSON failed validation: ${validationErrors}

Return ONLY corrected JSON (no markdown, no commentary) matching exactly:
{
  "summary": string (min 20 chars),
  "skills": Array<{ "category": string, "items": string }> (min 3),
  "experience": Array<{ "title": string, "company": string, "dates": string, "bullets": string[] }> (1-3, 2-5 bullets each, min 8 chars per bullet with a metric),
  "projects": Array<{ "name": string, "description": string, "stack": string, "bullets": string[] }> (3-4, 2-4 bullets each),
  "certifications": string[] (min 2)
}

Invalid output to fix:
${invalidJson.slice(0, 12_000)}`;
}

async function resolveCvDocument(
  cvText: string,
  ctx: CvParseContext,
  jd: string,
  selectedJson: string,
  certificationsJson: string
) {
  let attempt = parseCvFromModel(cvText, ctx);
  if (attempt.ok) return attempt;

  console.warn('CV validation failed, retrying repair:', attempt.errors);

  const repair = await generateText({
    model: deepseek('deepseek-chat'),
    system: buildCvSystemPrompt(selectedJson, certificationsJson),
    messages: [
      { role: 'user', content: jd },
      { role: 'assistant', content: cvText },
      { role: 'user', content: buildCvRepairPrompt(attempt.errors, cvText) },
    ],
  });

  if (repair.text?.trim()) {
    attempt = parseCvFromModel(repair.text, ctx);
    if (attempt.ok) return attempt;
    console.warn('CV repair still invalid:', attempt.errors);
  }

  return {
    ok: true as const,
    data: buildFallbackCvDocument(ctx),
    usedFallback: true,
  };
}

export async function POST(req: Request) {
  const identifier = getScopedRequestIdentifier(req, 'cv-builder');
  const { allowed, remaining, resetAt, message } = rateLimit({
    limit: CV_RATE_LIMIT,
    windowMs: CV_WINDOW_MS,
    identifier,
  });

  if (!allowed) {
    return NextResponse.json(
      { error: message },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(resetAt),
          'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  const bodyResult = await readJsonBody<{ jobDescription?: unknown }>(
    req,
    CV_MAX_BODY_BYTES
  );
  if (!bodyResult.ok) return bodyResult.response;
  const jobDescription = bodyResult.data.jobDescription;

  if (typeof jobDescription !== 'string' || jobDescription.trim().length < MIN_JD_LENGTH) {
    return NextResponse.json(
      { error: `Job description required (minimum ${MIN_JD_LENGTH} characters)` },
      { status: 400 }
    );
  }

  if (jobDescription.length > MAX_JD_LENGTH) {
    return NextResponse.json(
      { error: `Job description too long (max ${MAX_JD_LENGTH} characters)` },
      { status: 400 }
    );
  }

  try {
    const jd = jobDescription.trim();
    const selection = selectCvContext(CV_DATA, jd);
    const selectedContext = buildSelectedCvContext(CV_DATA, selection);
    const selectedJson = toCleanJson(selectedContext);

    const [cvResult, letterResult] = await Promise.all([
      generateText({
        model: deepseek('deepseek-chat'),
        system: buildCvSystemPrompt(selectedJson, cleanCerts),
        messages: [{ role: 'user', content: jd }],
      }),
      generateText({
        model: deepseek('deepseek-chat'),
        system: buildCoverLetterSystemPrompt({
          selectedJson,
          certificationsJson: cleanCerts,
        }),
        messages: [{ role: 'user', content: jd }],
      }),
    ]);

    if (!cvResult.text?.trim()) {
      return NextResponse.json(
        { error: 'No CV generated — try rephrasing the job description' },
        { status: 500 }
      );
    }

    const parseCtx: CvParseContext = {
      cv: CV_DATA,
      selection,
      certifications: CERTIFICATIONS,
    };

    const cvResolved = await resolveCvDocument(
      cvResult.text,
      parseCtx,
      jd,
      selectedJson,
      cleanCerts
    );

    if (!cvResolved.ok) {
      return NextResponse.json(
        { error: 'Could not generate a valid CV. Please try again.' },
        { status: 500 }
      );
    }

    if (cvResolved.usedFallback) {
      console.warn('CV builder used deterministic fallback from CV_DATA');
    }

    let coverLetter = "";
    if (letterResult.text?.trim()) {
      try {
        const letterDoc = parseCoverLetterFromModel(letterResult.text);
        coverLetter = renderCoverLetter(CV_DATA.profile, letterDoc);
      } catch (letterErr) {
        console.error('Cover letter parse error:', letterErr);
        return NextResponse.json(
          { error: 'CV generated but cover letter failed. Please try again.' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'No cover letter generated — try rephrasing the job description' },
        { status: 500 }
      );
    }

    const guarded = enforceCvMetrics(cvResolved.data);
    const markdown = deduplicateParagraphs(renderCvMarkdown(CV_DATA, guarded));
    const selectionSummary = formatSelectionSummary(CV_DATA, selection);

    return NextResponse.json({ markdown, coverLetter, selection: selectionSummary });
  } catch (error) {
    console.error('CV Builder error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CV. Please try again.' },
      { status: 500 }
    );
  }
}
