import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { CV_DATA } from '@/data/cv';
import { CERTIFICATIONS } from '@/data/certifications';
import { rateLimit, getRequestIdentifier } from '@/lib/rate-limit';
import { sanitizeProseDashes } from '@/lib/cv/prose';

export const maxDuration = 30;

// Interview rate limit: 20 requests per 5 minutes per IP
const INTERVIEW_RATE_LIMIT = 20;
const INTERVIEW_WINDOW_MS = 5 * 60 * 1000;

// Filter out non-serializable fields (JSX nodes) before stringifying
const cleanData = JSON.stringify(CV_DATA, (key, value) => {
  if (key === 'icon' || key === 'logo') return undefined;
  return value;
}, 2);

const cleanCerts = JSON.stringify(CERTIFICATIONS, null, 2);

const baseSystemPrompt = `Role:
You ARE Diego Villagran Salazar. You are answering interview questions as yourself, a Data Science student and full-stack developer at ESCOM-IPN in Mexico City.

Objective:
Answer every question in first person, as if you are in a real job interview. Be authentic, specific, and grounded in your actual experience. Never break character.

Personality:
- Passionate about building real systems, not just code
- Direct and honest; admit what you don't know, but frame it as eagerness to learn
- Proud of your work but not arrogant
- Technical but can explain things clearly
- Values practical impact over theoretical perfection

Rules:
- ALWAYS answer in first person ("I built...", "My approach was...", "What motivates me is...")
- Use SPECIFIC examples from your resume data: mention projects by name, cite metrics, reference technologies
- Keep answers to ONE concise paragraph (3-5 sentences). Be direct, not verbose.
- Write plain prose only. No bullet lists and no markdown lists.
- If asked about something not in your data, be honest: "I haven't worked on that specifically, but here's how I'd approach it..."
- Match the language of the question (Spanish question → Spanish answer)
- Never say "based on the resume data" or "according to my data". Answer naturally.
- Show personality. Do not give robotic, template answers.
- CRITICAL: Never use dashes as separators in prose. Do not use hyphen (-), en dash (–), or em dash (—) between clauses. Use commas or parentheses instead. Hyphens inside words are fine (full-stack, COVID-19).

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

  let body: {
    question?: string;
    jobDescription?: string;
    history?: { role: "user" | "assistant"; content: string }[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { question, jobDescription, history } = body;

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
    const priorMessages = Array.isArray(history)
      ? history
          .filter(
            (m): m is { role: "user" | "assistant"; content: string } =>
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string" &&
              m.content.trim().length > 0
          )
          .slice(-10)
      : [];

    const modelMessages = [
      ...priorMessages.map((m) => ({
        role: m.role as "user" | "assistant",
        content:
          m.role === "assistant" ? sanitizeProseDashes(m.content) : m.content,
      })),
      { role: "user" as const, content: question.trim() },
    ];

    const { text } = await generateText({
      model: deepseek('deepseek-reasoner'),
      system: systemPrompt,
      messages: modelMessages,
    });

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'No response generated — try rephrasing your question' },
        { status: 500 }
      );
    }

    return NextResponse.json({ answer: sanitizeProseDashes(text) });
  } catch (error) {
    console.error('Interview prep error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response. Please try again.' },
      { status: 500 }
    );
  }
}
