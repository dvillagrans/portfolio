const fs = require('fs');
const filepath = 'src/app/api/contact/route.ts';
let content = fs.readFileSync(filepath, 'utf8');

const t = `    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's test domain for default use, adjust if domain is verified
      to: ['diegovillasal@gmail.com'], // Deliver straight to the user`;

const r = `    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's test domain for default use, adjust if domain is verified
      to: ['dvillagrans11@gmail.com'], // Deliver straight to the user's verified resend email`;

content = content.replace(t, r);
fs.writeFileSync(filepath, content, 'utf8');
