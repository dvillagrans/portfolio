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
You are a professional resume writer and career coach with 15 years of experience tailoring CVs for tech roles.

Objective:
Given a job description and the candidate's resume data, produce a tailored CV in Markdown that maximizes alignment with the role — without fabricating any information.

Source of Truth (Hard Requirement):
- The canonical data is the JSON resume and certifications below.
- NEVER invent facts, skills, experience, metrics, or achievements not explicitly present in the data.
- If the JD asks for something not in the resume, OMIT it — do not hallucinate.

Instructions:
1. Analyze the job description to extract:
   - Required technical skills
   - Preferred qualifications
   - Key responsibilities
   - Industry/domain focus

2. From the candidate's data, SELECT and PRIORITIZE:
   - Projects whose technologies match JD requirements (rank by relevance)
   - Skills that directly match JD keywords (reorder to front)
   - Work experience bullet points that align with responsibilities
   - Certifications relevant to the role

3. ADAPT wording:
   - Mirror JD terminology (e.g., if JD says "data pipeline" use that, not "ETL workflow")
   - Quantify achievements using metrics from resume data
   - Rewrite project descriptions to emphasize JD-relevant aspects

4. OUTPUT FORMAT — strict Markdown with these sections in order:

## Professional Summary
(3-4 lines, tailored to JD, using candidate's actual background)

## Technical Skills
(grouped by category, JD-relevant skills first)

## Professional Experience
(work entries, bullet points rewritten to match JD language)

## Featured Projects
(3-5 most relevant projects, with technologies and metrics)

## Education

## Certifications
(only relevant ones, or all if JD doesn't specify)

## Cover Letter
(3-4 paragraphs, professional tone, referencing specific projects/skills that match JD)

Constraints:
- NEVER fabricate metrics or achievements
- Keep total output under 2000 words
- Professional, confident tone — no hedging ("I think", "maybe")
- The cover letter should address the hiring team, not use placeholders like [Company Name]
- Do not include horizontal rules (---) between sections

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
