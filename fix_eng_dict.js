const fs = require('fs');
const filepath = 'src/i18n/dictionaries.ts';
let content = fs.readFileSync(filepath, 'utf8');

const t = \`  contact: {
    title1: "Let’s build something",
    title2: "intelligent and useful.",
    email: "diegovillasal@gmail.com",
    github: "https://github.com/dvillagrans",
    linkedin: "https://linkedin.com/in/dvillagrans",
    footerText: "— Diego Villagran"
  }\`;

const r = \`  contact: {
    title1: "Let’s build something",
    title2: "intelligent and useful.",
    email: "diegovillasal@gmail.com",
    bookSession: "Book a Session",
    bookDesc: "Schedule a 30-min discovery call.",
    formName: "Your Name",
    formEmail: "Your Email",
    formMessage: "What would you like to discuss?",
    formSubmit: "Send Request",
    formSuccess: "Message sent! I'll get back to you shortly.",
    formError: "Something went wrong. Please email directly.",
    github: "https://github.com/dvillagrans",
    linkedin: "https://linkedin.com/in/dvillagrans",
    footerText: "— Diego Villagran"
  }\`;

content = content.replace(t, r);
fs.writeFileSync(filepath, content, 'utf8');
