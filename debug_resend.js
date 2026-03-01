require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API);

async function test() {
  const { data, error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: 'dvillagrans11@gmail.com',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
  });

  if (error) {
    return console.error("ERROR:", error);
  }
  console.log("SUCCESS:", data);
}

test();
