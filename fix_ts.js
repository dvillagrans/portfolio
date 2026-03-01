const fs = require('fs');

let content = fs.readFileSync('src/i18n/dictionaries.ts', 'utf8');

// The TS compiler is complaining because TimeUp lacks an `href` property. Typescript inferred that `href` is required in all items because the previous ones had it.
// I will just add an empty `href: "#",` to the new TimeUp dict entries to satisfy the static type inference.

content = content.replace('caseStudy: "/projects/timeup",', 'caseStudy: "/projects/timeup",\n        href: "https://timeup.mx",');
content = content.replace('caseStudy: "/projects/timeup",', 'caseStudy: "/projects/timeup",\n        href: "https://timeup.mx",'); // Do it twice for EN and ES

fs.writeFileSync('src/i18n/dictionaries.ts', content);

