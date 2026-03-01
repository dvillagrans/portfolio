const fs = require('fs');

let content = fs.readFileSync('src/i18n/dictionaries.ts', 'utf8');

// The `es` and `en` archive sections need to be updated to include TimeUp explicitly with its links instead of generic entries.
// We will replace the projects array in both languages.

const enProjectsArrayOld = `projects: [
      { year: "2024", title: "Global FinTech Architecture", domain: "Finance / Micro-frontends", link: "#" },
      { year: "2023", title: "AI-Driven Product Lab", domain: "LLM / Next.js Orchestration", link: "#" },
      { year: "2023", title: "Editorial Commerce Engine", domain: "E-commerce / WebGL", link: "#" },
      { year: "2022", title: "Enterprise Identity Platform", domain: "Security / OAuth", link: "#" },
      { year: "2022", title: "Automated Logistics Dashboard", domain: "Supply Chain / React", link: "#" },
      { year: "2021", title: "Healthcare Data Visualizer", domain: "Health / D3.js", link: "#" },
      { year: "2021", title: "Legacy System Migration", domain: "Infrastructure", link: "#" }
    ]`;

const esProjectsArrayOld = `projects: [
      { year: "2024", title: "Arquitectura FinTech Global", domain: "Finanzas / Micro-frontends", link: "#" },
      { year: "2023", title: "Laboratorio de Producto con IA", domain: "LLM / Next.js Orchestration", link: "#" },
      { year: "2023", title: "Motor de Comercio Editorial", domain: "E-commerce / WebGL", link: "#" },
      { year: "2022", title: "Plataforma de Identidad Empresarial", domain: "Seguridad / OAuth", link: "#" },
      { year: "2022", title: "Dashboard de Logística Automatizada", domain: "Cadena de Suministro / React", link: "#" },
      { year: "2021", title: "Visualizador de Datos de Salud", domain: "Salud / D3.js", link: "#" },
      { year: "2021", title: "Migración de Sistema Legacy", domain: "Infraestructura", link: "#" }
    ]`;

const enProjectsArrayNew = `projects: [
      { year: "2024", title: "TimeUp", domain: "SaaS / Next.js / Serverless", link: "https://timeup.mx", caseStudy: "/projects/timeup", isFeatured: true },
      { year: "2024", title: "Global FinTech Architecture", domain: "Finance / Micro-frontends", link: "#" },
      { year: "2023", title: "AI-Driven Product Lab", domain: "LLM / Next.js Orchestration", link: "#" },
      { year: "2023", title: "Editorial Commerce Engine", domain: "E-commerce / WebGL", link: "#" },
      { year: "2022", title: "Enterprise Identity Platform", domain: "Security / OAuth", link: "#" },
      { year: "2022", title: "Automated Logistics Dashboard", domain: "Supply Chain / React", link: "#" }
    ]`;

const esProjectsArrayNew = `projects: [
      { year: "2024", title: "TimeUp", domain: "SaaS / Next.js / Serverless", link: "https://timeup.mx", caseStudy: "/projects/timeup", isFeatured: true },
      { year: "2024", title: "Arquitectura FinTech Global", domain: "Finanzas / Micro-frontends", link: "#" },
      { year: "2023", title: "Laboratorio de Producto con IA", domain: "LLM / Next.js Orchestration", link: "#" },
      { year: "2023", title: "Motor de Comercio Editorial", domain: "E-commerce / WebGL", link: "#" },
      { year: "2022", title: "Plataforma de Identidad Empresarial", domain: "Seguridad / OAuth", link: "#" },
      { year: "2022", title: "Dashboard de Logística Automatizada", domain: "Cadena de Suministro / React", link: "#" }
    ]`;

content = content.replace(enProjectsArrayOld, enProjectsArrayNew);
content = content.replace(esProjectsArrayOld, esProjectsArrayNew);

fs.writeFileSync('src/i18n/dictionaries.ts', content);
