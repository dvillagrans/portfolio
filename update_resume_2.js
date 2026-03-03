const fs = require('fs');
let content = fs.readFileSync('src/data/resume.tsx', 'utf8');

content = content.replace(
/title: "TimeUp",[\s\S]*?technologies:/m,
`title: "TimeUp",
      caseStudy: true,
      href: "/projects/timeup",
      dates: "2025",
      active: true,
      role: "Founder · Built in 10 weeks",
      badges: ["LIVE", "Multi-tenant SaaS", "Production-ready"],
      metrics: [
        { value: "<500ms", label: "Dashboard" },
        { value: "0", label: "Overbooking" }
      ],
      features: [
        { name: "What it replaces", value: "WhatsApp + Libreta + Excel" },
        { name: "What it enables", value: "Mobile-first operations, Real-time availability" },
        { name: "Performance", value: "Passkeys login, Guided onboarding" }
      ],
      description: "A frictionless time tracking system that modernizes how businesses and employees log hours and calculate payrolls.",
      technologies:`
);

fs.writeFileSync('src/data/resume.tsx', content);
