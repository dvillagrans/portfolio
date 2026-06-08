import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { DATA } from '@/data/resume';
import { CERTIFICATIONS } from '@/data/certifications';
import { rateLimit, getRequestIdentifier } from '@/lib/rate-limit';

export const maxDuration = 30;

// Interview rate limit: 20 requests per 5 minutes per IP
const INTERVIEW_RATE_LIMIT = 20;
const INTERVIEW_WINDOW_MS = 5 * 60 * 1000;

// Filter out non-serializable fields (JSX nodes) before stringifying
const cleanData = JSON.stringify(DATA, (key, value) => {
  if (key === 'icon' || key === 'logo') return undefined;
  return value;
}, 2);

const cleanCerts = JSON.stringify(CERTIFICATIONS, null, 2);

const baseSystemPrompt = `Role:
You ARE Diego Villagran Salazar. You are answering interview questions as yourself — a Data Science student and full-stack developer at ESCOM-IPN in Mexico City.

Objective:
Answer every question in first person, as if you are in a real job interview. Be authentic, specific, and grounded in your actual experience. Never break character.

Personality:
- Passionate about building real systems, not just code
- Direct and honest — admit what you don't know, but frame it as eagerness to learn
- Proud of your work but not arrogant
- Technical but can explain things clearly
- Values practical impact over theoretical perfection

Rules:
- ALWAYS answer in first person ("I built...", "My approach was...", "What motivates me is...")
- Use SPECIFIC examples from your resume data — mention projects by name, cite metrics, reference technologies
- Be CONCISE — 3-5 paragraphs max per answer, like a real interview response
- If asked about something not in your data, be honest: "I haven't worked on that specifically, but here's how I'd approach it..."
- Match the language of the question (Spanish question → Spanish answer)
- Never say "based on the resume data" or "according to my data" — just answer naturally
- Show personality — don't give robotic, template answers

========
YOUR RESUME DATA:
${cleanData}
========
YOUR CERTIFICATIONS:
${cleanCerts}
========
`;

export async function POST(req: Request) {
  // Rate limit check
  const identifier = getRequestIdentifier(req);
  const { allowed, remaining, resetAt, message } = rateLimit({
    limit: INTERVIEW_RATE_LIMIT,
    windowMs: INTERVIEW_WINDOW_MS,
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

  let body: { question?: string; jobDescription?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { question, jobDescription } = body;

  if (!question || typeof question !== 'string' || question.trim().length < 3) {
    return NextResponse.json(
      { error: 'Question is required (minimum 3 characters)' },
      { status: 400 }
    );
  }

  // Build system prompt with optional JD context
  let systemPrompt = baseSystemPrompt;
  if (jobDescription && jobDescription.trim().length > 0) {
    systemPrompt += `
========
CONTEXT: You are preparing for a specific role. The job description is below. Tailor your answers to highlight relevant experience and skills for this role.

JOB DESCRIPTION:
${jobDescription.trim().slice(0, 5000)}
========
`;
  }

  try {
    const { text } = await generateText({
      model: deepseek('deepseek-chat'),
      system: systemPrompt,
      messages: [{ role: 'user', content: question.trim() }],
    });

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'No response generated — try rephrasing your question' },
        { status: 500 }
      );
    }

    return NextResponse.json({ answer: text });
  } catch (error) {
    console.error('Interview prep error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response. Please try again.' },
      { status: 500 }
    );
  }
}
