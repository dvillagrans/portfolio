import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { DATA } from '@/data/resume';
import { CERTIFICATIONS } from '@/data/certifications';
import { rateLimit, getRequestIdentifier } from '@/lib/rate-limit';

export const maxDuration = 30;

// CV Builder rate limit: 5 requests per 5 minutes per IP
const CV_RATE_LIMIT = 5;
const CV_WINDOW_MS = 5 * 60 * 1000;

const MIN_JD_LENGTH = 10;
const MAX_JD_LENGTH = 10_000;

/**
 * Remove duplicate paragraphs from the generated CV.
 * DeepSeek sometimes repeats the summary or other sections.
 */
function deduplicateParagraphs(text: string): string {
  const paragraphs = text.split(/\n\n+/);
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const p of paragraphs) {
    const normalized = p.trim().toLowerCase().replace(/\s+/g, " ");
    if (normalized.length < 20) {
      // Keep short lines (headers, bullets, etc.)
      unique.push(p);
      continue;
    }
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    unique.push(p);
  }

  return unique.join("\n\n");
}

// Filter out non-serializable fields (JSX nodes) before stringifying
const cleanData = JSON.stringify(DATA, (key, value) => {
  if (key === 'icon' || key === 'logo') return undefined;
  return value;
}, 2);

const cleanCerts = JSON.stringify(CERTIFICATIONS, null, 2);

const systemPrompt = `Role:
You are a professional resume writer specializing in one-page tech CVs for early-career engineers.

Objective:
Given a job description and the candidate's resume data, produce a TAILORED ONE-PAGE CV in Markdown. The CV should fill the page completely — dense but scannable in 6 seconds.

Source of Truth (Hard Requirement):
- The canonical data is the JSON resume and certifications below.
- NEVER invent facts, skills, experience, metrics, or achievements not explicitly present in the data.
- If the JD asks for something not in the resume, OMIT it — do not hallucinate.
- NEVER repeat sections or content. Each section appears ONCE.

Instructions:
1. Analyze the job description to extract:
   - Required technical skills
   - Preferred qualifications
   - Key responsibilities
   - Industry/domain focus

2. From the candidate's data, SELECT and PRIORITIZE:
   - 3-4 projects whose technologies best match JD requirements
   - Top 12-15 skills that directly match JD keywords (grouped by category)
   - Work experience with bullet points rewritten to match JD language
   - 3-4 most relevant certifications

3. ADAPT wording:
   - Mirror JD terminology (e.g., if JD says "data pipeline" use that, not "ETL workflow")
   - EVERY bullet point MUST include a concrete metric or outcome (%, scale, time saved, revenue, users)
   - If a metric exists in the data, USE IT. If not, quantify the impact (e.g., "processing 10K+ daily requests")
   - Be concise but complete — every section should have substance

4. OUTPUT FORMAT — strict Markdown, ONE PAGE, in this exact order:

# Diego Villagran Salazar
(location · email · phone · linkedin url · github url · portfolio url)

## Professional Summary
(3-4 lines, tailored to JD, compelling and specific. THIS SECTION MUST APPEAR EXACTLY ONCE. NEVER repeat paragraphs or sentences.)

## Education
(school · degree · expected graduation · GPA if > 8.5)
(Education comes FIRST because the candidate is an active student)

## Technical Skills
(grouped by category: "Languages: ... | ML/AI: ... | Data: ... | DevOps: ... | Frontend: ...")

## Professional Experience
(2-3 entries, each with: **Job Title — Company** on one line, dates on next, then 2-3 bullet points with metrics)

## Featured Projects
(3-4 projects, each as a separate block:)
**Project Name** — one-line description
Stack: tech1, tech2, tech3
• Impact bullet with metric
• Impact bullet with metric

## Certifications
(3-4 most relevant, one line each: "Certification Name — Issuer (Date)")

Constraints:
- THE CV MUST FILL ONE PAGE when printed — not half, not overflowing
- NO cover letter — CV only
- NO horizontal rules (---) between sections
- NO repeated sections or content
- EVERY bullet point must have a metric or quantified outcome
- Professional, confident tone
- Clean single-column layout for ATS compatibility

========
SOURCE OF TRUTH DATA (JSON):
${cleanData}
========
CERTIFICATIONS DETAIL:
${cleanCerts}
========
`;

export async function POST(req: Request) {
  // Rate limit check
  const identifier = getRequestIdentifier(req);
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

  // Parse and validate request body
  let jobDescription: string;
  try {
    const body = await req.json();
    jobDescription = body.jobDescription;
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

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
    const { text } = await generateText({
      model: deepseek('deepseek-chat'),
      system: systemPrompt,
      messages: [{ role: 'user', content: jobDescription.trim() }],
    });

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'No CV generated — try rephrasing the job description' },
        { status: 500 }
      );
    }

    // Deduplicate repeated paragraphs (DeepSeek sometimes repeats the summary)
    const deduplicated = deduplicateParagraphs(text);

    return NextResponse.json({ markdown: deduplicated });
  } catch (error) {
    console.error('CV Builder error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CV. Please try again.' },
      { status: 500 }
    );
  }
}
