const fs = require('fs');
const filepath = 'src/i18n/dictionaries.ts';
let content = fs.readFileSync(filepath, 'utf8');

// Replace EN archive.projects
const enArchiveProjectsTarget = `    projects: [
      { year: "2025", title: "NYC Ride-Hailing Analytics Dashboard", domain: "Data Science / Streamlit", link: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" },`;

const enArchiveProjectsReplacement = `    projects: [
      { year: "2026", title: "TimeUp SaaS Platform", domain: "Full Stack / SaaS", link: "https://timeup.mx", isFeatured: true, caseStudy: "/projects/timeup" },
      { year: "2025", title: "NYC Ride-Hailing Analytics Dashboard", domain: "Data Science / Streamlit", link: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" },`;

// Replace ES archive.projects
const esArchiveProjectsTarget = `    projects: [
      { year: "2025", title: "NYC Ride-Hailing Analytics Dashboard", domain: "Data Science / Streamlit", link: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" },`;

const esArchiveProjectsReplacement = `    projects: [
      { year: "2026", title: "TimeUp SaaS Platform", domain: "Full Stack / SaaS", link: "https://timeup.mx", isFeatured: true, caseStudy: "/projects/timeup" },
      { year: "2025", title: "NYC Ride-Hailing Analytics Dashboard", domain: "Data Science / Streamlit", link: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" },`;

if (content.includes(enArchiveProjectsTarget)) {
    // Both share the exact same first line, so replacing globally will replace both
    content = content.replaceAll(enArchiveProjectsTarget, enArchiveProjectsReplacement);
    fs.writeFileSync(filepath, content, 'utf8');
    console.log("Updated archive items successfully!");
} else {
    console.log("Could not find the target string.");
}
