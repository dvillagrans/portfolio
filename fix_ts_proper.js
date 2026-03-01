const fs = require('fs');

let content = fs.readFileSync('src/i18n/dictionaries.ts', 'utf8');

// Use regex to locate caseStudy lines and see if there are remaining missing hrefs
// Actually, earlier the ES array wasn't fully checked, and one item might still be missing href.
content = content.replace(/caseStudy: "\/projects\/timeup",\s*(?!href)/g, 'caseStudy: "/projects/timeup",\n        href: "https://timeup.mx",\n');

// Also make sure rest of the objects in work.projects array HAVE the same keys.
// The compiler thinks some arrays are `{..., href}` and some are `{..., href, caseStudy}`. Let's add an optional caseStudy to one of the non-featured items so TS infers caseStudy is optional for all.

content = content.replace(/id: "02"/g, 'caseStudy: undefined,\n        id: "02"');

fs.writeFileSync('src/i18n/dictionaries.ts', content);
