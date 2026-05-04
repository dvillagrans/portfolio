import Script from "next/script";

export function PersonSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Diego Villagran Salazar",
    url: "https://www.dvillagrans.dev",
    image: "https://www.dvillagrans.dev/img/optimized/me-1200.webp",
    jobTitle: "AI & Data Engineer",
    description:
      "Senior AI & Data Engineer building production ML pipelines, LLM automation, and scalable infrastructure.",
    sameAs: [
      "https://github.com/dvillagrans",
      "https://linkedin.com/in/dvillagrans",
    ],
    knowsAbout: [
      "Machine Learning",
      "Data Engineering",
      "Large Language Models",
      "Python",
      "Next.js",
      "React",
      "TypeScript",
      "ETL Pipelines",
      "Docker",
      "Kubernetes",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "ESCOM-IPN",
    },
    worksFor: {
      "@type": "Organization",
      name: "EyeNet",
    },
  };

  return (
    <Script
      id="schema-person"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function EyeNetProjectSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EyeNet — AI & Automation Systems",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      "Full AI infrastructure: LLM pipelines, ETL/ELT, containerized microservices, and production apps.",
    url: "https://www.dvillagrans.dev/projects/eyenet",
    author: {
      "@type": "Person",
      name: "Diego Villagran Salazar",
    },
  };

  return (
    <Script
      id="schema-eyenet"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function TimeUpProjectSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TimeUp — SaaS Time Tracking Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      "Multi-tenant cloud platform for health & wellness sector with biometric Passkeys, real-time WebSocket sync, and serverless architecture.",
    url: "https://www.dvillagrans.dev/projects/timeup",
    author: {
      "@type": "Person",
      name: "Diego Villagran Salazar",
    },
  };

  return (
    <Script
      id="schema-timeup"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Diego Villagran — Portfolio",
    url: "https://www.dvillagrans.dev",
    description:
      "AI & Data Engineer portfolio showcasing ML pipelines, LLM automation, data engineering, and full-stack systems.",
    inLanguage: ["en", "es"],
    author: {
      "@type": "Person",
      name: "Diego Villagran Salazar",
    },
  };

  return (
    <Script
      id="schema-website"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
