import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit, getRequestIdentifier } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API);

// Contact rate limit: 3 requests per hour per IP
const CONTACT_RATE_LIMIT = 3;
const CONTACT_WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: Request) {
  try {
    // Rate limit check
    const identifier = getRequestIdentifier(req);
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

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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
                    <strong style="color: #2b5a5c; font-weight: 600;">${name}</strong>
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
                        <p style="margin: 0; font-size: 16px; color: #f7f6f2;">${name}</p>
                      </td>
                      <td width="50%" valign="top">
                        <p style="margin: 0 0 8px; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #737373;">Email</p>
                        <a href="mailto:${email}" style="margin: 0; font-size: 16px; color: #2b5a5c; text-decoration: none;">${email}</a>
                      </td>
                    </tr>
                  </table>
                  
                  <div style="background-color: #090a0a; border: 1px solid #262626; border-radius: 8px; padding: 24px; margin-bottom: 40px;">
                    <p style="margin: 0 0 16px; font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #737373;">Message Intent</p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #e2e2e2; white-space: pre-wrap;">${message}</p>
                  </div>

                  <a href="mailto:${email}" style="display: inline-block; padding: 14px 28px; background-color: #f7f6f2; color: #090a0a; text-decoration: none; font-family: 'Courier New', Courier, monospace; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px;">
                    Reply to ${name.split(' ')[0]}
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

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's test domain for default use, adjust if domain is verified
      to: ['dvillagrans11@gmail.com'], // Deliver straight to the user's verified resend email
      subject: `New Session Request from ${name}`,
      html: htmlTemplate,
      replyTo: email,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
