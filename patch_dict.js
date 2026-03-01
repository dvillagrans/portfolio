const fs = require('fs');

let content = fs.readFileSync('src/i18n/dictionaries.ts', 'utf8');

const enContact = `  contact: {
    title1: "Have a system to build?",
    title2: "Let's map it out.",
    footerText: "— Built to Scale."
  }`;

const enReplacement = `  contact: {
    title1: "Have a system to build?",
    title2: "Let's map it out.",
    footerText: "— Built to Scale."
  },
  work: {
    ...en.work, // This will break if en is not defined. Wait, better to replace inside work directly, but doing a massive replace might be tough.
  }`;

// Actually I'll just rewrite the file fully with the script adding the new code.
