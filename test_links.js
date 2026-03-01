const fs = require('fs');
const filepath = 'src/i18n/dictionaries.ts';
let content = fs.readFileSync(filepath, 'utf8');

// Update work.projects TimeUp entry
// Finding the TimeUp object in en and es work.projects
const enWorkPattern = `        href: "https://timeup.mx",
        caseStudy: "/projects/timeup"
      },`;
const newEnWork = `        links: [
          { label: "App Usuarios", url: "https://timeup.mx" },
          { label: "App Negocios", url: "https://negocios.timeup.mx" }
        ],
        caseStudy: "/projects/timeup"
      },`;
content = content.replace(enWorkPattern, newEnWork);
content = content.replace(enWorkPattern, newEnWork); // Replace in ES as well since they are identical initially

// Now for archive.projects
const archivePattern = `      { year: "2026", title: "TimeUp SaaS Platform", domain: "Full Stack / SaaS", link: "https://timeup.mx", isFeatured: true, caseStudy: "/projects/timeup" },`;
const newArchive = `      { year: "2026", title: "TimeUp SaaS Platform", domain: "Full Stack / SaaS", links: [{label: "App Usuarios", url: "https://timeup.mx"}, {label: "App Negocios", url: "https://negocios.timeup.mx"}], isFeatured: true, caseStudy: "/projects/timeup" },`;
content = content.replace(archivePattern, newArchive);
content = content.replace(archivePattern, newArchive); // ES replace

fs.writeFileSync(filepath, content, 'utf8');
console.log("Replaced!");
