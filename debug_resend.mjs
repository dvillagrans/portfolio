import { Resend } from 'resend';
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API);

async function test() {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'diegovillasal@gmail.com',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
  });

  if (error) {
    return console.error(error);
  }
  console.log(data);
}

test();
