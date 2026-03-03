const fs = require('fs');

let content = fs.readFileSync('src/i18n/dictionaries.ts', 'utf8');

// The sed command accidentally duplicated testing. Let's strictly fix formatting.

// Reverting and properly formatting EN and ES objects
content = content.replace(
  '    linkedin: "https://linkedin.com/in/dvillagrans",\n    footerText: "— Diego Villagran",\n  \n  timeup: {',
  '    linkedin: "https://linkedin.com/in/dvillagrans",\n    footerText: "— Diego Villagran"\n  },\n  timeup: {'
);

content = content.replace(
  '    linkedin: "https://www.linkedin.com/in/diegovillagrans/",\n    footerText: "— Diego Villagran"\n  },\n  }\n\n  timeup: {',
  '    linkedin: "https://www.linkedin.com/in/diegovillagrans/",\n    footerText: "— Diego Villagran"\n  },\n  timeup: {'
);

fs.writeFileSync('src/i18n/dictionaries.ts', content);
