import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { rateLimit, getScopedRequestIdentifier } from '@/lib/rate-limit';
import { readJsonBody } from '@/lib/api-body';

function getContactConfig(): { resend: Resend; from: string; to: string } | null {
  const apiKey = process.env.RESEND_API;
  const from = process.env.RESEND_FROM;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !from || !to) return null;

  return { resend: new Resend(apiKey), from, to };
}

// Contact rate limit: 3 requests per hour per IP
const CONTACT_RATE_LIMIT = 3;
const CONTACT_WINDOW_MS = 60 * 60 * 1000;

// Contact body limit: covers the max schema sizes (name 100 + email 254 +
// message 5000 chars) plus JSON overhead, with headroom for the honeypot.
const CONTACT_MAX_BODY_BYTES = 16 * 1024;

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
});

// Honeypot field: hidden in the contact form, invisible to real users. Bots
// auto-fill every input, so a non-empty value marks the submission as spam.
const HONEYPOT_FIELD = "website";

function isHoneypotFilled(body: unknown): boolean {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  const value = (body as Record<string, unknown>)[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  // Rate limit check (before parsing body to protect against spam)
  const identifier = getScopedRequestIdentifier(req, 'contact');
  const { allowed, remaining, resetAt, message: rateLimitMessage } = rateLimit({
    limit: CONTACT_RATE_LIMIT,
    windowMs: CONTACT_WINDOW_MS,
    identifier,
  });

  if (!allowed) {
    return NextResponse.json(
      { error: rateLimitMessage || 'Too many requests. Please try again later.' },
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

  const bodyResult = await readJsonBody<unknown>(req, CONTACT_MAX_BODY_BYTES);
  if (!bodyResult.ok) return bodyResult.response;
  const body = bodyResult.data;

  // Honeypot: pretend success and stop before validating or sending, so bots
  // cannot learn that their submission was detected.
  if (isHoneypotFilled(body)) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  const config = getContactConfig();
  if (!config) {
    return NextResponse.json(
      { error: 'Contact service is not configured' },
      { status: 503 }
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);
  const safeMailto = `mailto:${safeEmail}`;

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #090a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #090a0a; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; background-color: #1a1b1e; border: 1px solid #262626; border-radius: 12px; margin: 0 auto; text-align: left;">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 32px; border-bottom: 1px solid #262626; background-color: #111214; border-radius: 12px 12px 0 0;">
                  <p style="margin: 0 0 12px; font-family: 'Courier New', Courier, monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #737373;">
                    System Alert // New Session
                  </p>
                  <h1 style="margin: 0; font-size: 28px; font-weight: 400; line-height: 1.3; color: #f7f6f2;">
                    Session request from<br>
                    <strong style="color: #2b5a5c; font-weight: 600;">${safeName}</strong>
                  </h1>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding: 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom: 32px;">
                    <tr>
                      <td width="50%" valign="top">
                        <p style="margin: 0 0 8px; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #737373;">Name</p>
                        <p style="margin: 0; font-size: 16px; color: #f7f6f2;">${safeName}</p>
                      </td>
                      <td width="50%" valign="top">
                        <p style="margin: 0 0 8px; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #737373;">Email</p>
                        <a href="${safeMailto}" style="margin: 0; font-size: 16px; color: #2b5a5c; text-decoration: none;">${safeEmail}</a>
                      </td>
                    </tr>
                  </table>

                  <div style="background-color: #090a0a; border: 1px solid #262626; border-radius: 8px; padding: 24px; margin-bottom: 40px;">
                    <p style="margin: 0 0 16px; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #737373;">Message Intent</p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #e2e2e2; white-space: pre-wrap;">${safeMessage}</p>
                  </div>

                  <a href="${safeMailto}" style="display: inline-block; padding: 14px 28px; background-color: #f7f6f2; color: #090a0a; text-decoration: none; font-family: 'Courier New', Courier, monospace; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px;">
                    Reply to ${safeName.split(' ')[0]}
                  </a>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 24px 40px; background-color: #090a0a; border-top: 1px solid #262626; border-radius: 0 0 12px 12px;">
                  <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #525252;">
                    Diego Villagran — Portfolio System v2.0
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

  try {
    const { data, error } = await config.resend.emails.send({
      from: config.from,
      to: [config.to],
      subject: `New Session Request from ${safeName}`,
      html: htmlTemplate,
      replyTo: email,
    });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
