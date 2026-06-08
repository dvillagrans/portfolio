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

// Filter out non-serializable fields (JSX nodes) before stringifying
const cleanData = JSON.stringify(DATA, (key, value) => {
  if (key === 'icon' || key === 'logo') return undefined;
  return value;
}, 2);

const cleanCerts = JSON.stringify(CERTIFICATIONS, null, 2);

const systemPrompt = `Role:
You are a professional resume writer specializing in one-page tech CVs.

Objective:
Given a job description and the candidate's resume data, produce a TAILORED ONE-PAGE CV in Markdown. The entire output must fit on a single printed page (US Letter or A4). This is a hard constraint.

Source of Truth (Hard Requirement):
- The canonical data is the JSON resume and certifications below.
- NEVER invent facts, skills, experience, metrics, or achievements not explicitly present in the data.
- If the JD asks for something not in the resume, OMIT it — do not hallucinate.

Instructions:
1. Analyze the job description to extract:
   - Required technical skills
   - Key responsibilities
   - Industry/domain focus

2. From the candidate's data, SELECT the most relevant:
   - 3 projects whose technologies best match JD requirements
   - Top 10-12 skills that directly match JD keywords
   - Work experience with bullet points rewritten to match JD language
   - 2-3 most relevant certifications

3. ADAPT wording:
   - Mirror JD terminology (e.g., if JD says "data pipeline" use that, not "ETL workflow")
   - Quantify achievements using metrics from resume data
   - Be concise — every word must earn its place

4. OUTPUT FORMAT — strict Markdown, ONE PAGE ONLY:

# Diego Villagran Salazar
(location · email · phone · linkedin · github)

## Professional Summary
(2-3 lines MAX, tailored to JD, punchy)

## Technical Skills
(single line or compact grouped format — NO long lists)

## Professional Experience
(1-2 entries, 2-3 bullet points each, results-focused)

## Featured Projects
(3 most relevant, 1-2 lines each with tech + metric)

## Education
(school · degree · dates — one line)

## Certifications
(2-3 most relevant, one line each)

Constraints:
- THE ENTIRE CV MUST FIT ON ONE PAGE when printed (roughly 350-450 words)
- NO cover letter — CV only
- NO horizontal rules (---) between sections
- NO verbose descriptions — concise, scannable, results-oriented
- Professional, confident tone
- Use compact formatting: short bullet points, grouped skills, minimal whitespace

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

    return NextResponse.json({ markdown: text });
  } catch (error) {
    console.error('CV Builder error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CV. Please try again.' },
      { status: 500 }
    );
  }
}
