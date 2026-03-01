const fs = require('fs');

let resumeContent = fs.readFileSync('src/data/resume.tsx', 'utf-8');

// Add caseStudy: true to TimeUp
resumeContent = resumeContent.replace(/title: "TimeUp \/\/ Time Tracking SaaS",/, 'title: "TimeUp // Time Tracking SaaS",\n      caseStudy: true,');

// For any other project that had 'caseStudy' maybe we just leave it for the user to add later, as the prompt says "de momento solo lo tiene el proeycto timeup".

fs.writeFileSync('src/data/resume.tsx', resumeContent);

let dictContent = fs.readFileSync('src/i18n/dictionaries.tsx', 'utf-8');

// The work.projects is mapped as: outcome: ..., href: p.href, links: ... Add caseStudy !
dictContent = dictContent.replace(/href: p\.href,\n\s*links:/g, 'href: p.href,\n      caseStudy: p.caseStudy ? p.href : undefined,\n      links:');

// The archive.projects is mapped as: isFeatured: p.active. Change it to isFeatured: p.caseStudy (as they want caseStudy=true to highlight them)
dictContent = dictContent.replace(/isFeatured: p\.active,/g, 'isFeatured: p.caseStudy || false,');

// Also in archive.projects mapping, add caseStudy just in case
dictContent = dictContent.replace(/domain: p\.role,/g, 'domain: p.role,\n      caseStudy: p.caseStudy ? p.href : undefined,');

fs.writeFileSync('src/i18n/dictionaries.tsx', dictContent);

