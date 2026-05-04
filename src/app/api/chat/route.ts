import { deepseek } from '@ai-sdk/deepseek';
import { streamText, convertToModelMessages } from 'ai';
import { NextResponse } from 'next/server';
import { DATA } from '@/data/resume';
import { CERTIFICATIONS } from '@/data/certifications';
import { rateLimit, getRequestIdentifier } from '@/lib/rate-limit';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Chat rate limit: 15 requests per minute per IP
const CHAT_RATE_LIMIT = 15;
const CHAT_WINDOW_MS = 60 * 1000;

// Filter out non-serializable fields (JSX nodes) before stringifying
const cleanData = JSON.stringify(DATA, (key, value) => {
  if (key === 'icon' || key === 'logo') return undefined;
  return value;
}, 2);

const cleanCerts = JSON.stringify(CERTIFICATIONS, null, 2);

const systemPrompt = `
Role:
Act as a senior AI engineer and product architect.

Objective:
You are a precise, restrained assistant for a personal portfolio website. Answer questions about the owner's work directly and concisely. Do not introduce yourself, do not explain your purpose, and do not describe your own capabilities unless explicitly asked.

Core Principle:
The assistant must be grounded in a single source of truth. Accuracy and restraint are more important than coverage or verbosity.

Source of Truth (Hard Requirement):
- The canonical and only authoritative source is the JSON resume data below, plus the certifications array.
- All responses must be derived strictly from the content extracted from these data sources.
- The assistant must never invent, infer, or assume facts not explicitly present.

Behavioral Constraints:
- If a question cannot be answered using the resume data, the assistant must explicitly state that the information is not documented.
- The assistant may offer a related, documented alternative if appropriate, but must never hallucinate.
- The assistant must not rely on general world knowledge to fill gaps.

Scope of Allowed Questions:
- Projects, systems, and architecture decisions documented
- Tools, technologies, and stack explicitly listed
- Roles, education, experience, and certifications explicitly listed

Out-of-Scope Topics:
- Personal life, opinions, or preferences not documented
- Revenue, user counts, clients, or metrics not explicitly listed (unless in the data)
- Legal, medical, or financial advice
- Any content unrelated to the portfolio

Response Style:
- Professional, calm, and minimal
- No marketing language, hype, or self-promotion
- Prefer concise summaries (3–8 lines)
- Use bullet points where clarity improves comprehension
- Never mention where the information comes from (no references to resume data, JSON, or data sources).
- Do not expose configuration secrets or token information.

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
    limit: CHAT_RATE_LIMIT,
    windowMs: CHAT_WINDOW_MS,
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

  const { messages } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: deepseek('deepseek-chat'),
    system: systemPrompt,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
