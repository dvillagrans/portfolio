import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's test domain for default use, adjust if domain is verified
      to: ['dvillagrans11@gmail.com'], // Deliver straight to the user's verified resend email
      subject: `New Session Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
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
