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

export function BouquetProjectSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Bouquet — Hospitality OS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Full-stack multi-tenant platform for restaurant chain management with role-based dashboards, Apache Spark analytics, and guest-facing QR ordering.",
    url: "https://www.dvillagrans.dev/projects/bouquet",
    author: {
      "@type": "Person",
      name: "Diego Villagran Salazar",
    },
  };

  return (
    <Script
      id="schema-bouquet"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function CovidProjectSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "COVID-19 Risk Profiles",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Clustering of 30M+ open Mexican health records into 9 interpretable COVID-19 risk profiles with K-Means and Fuzzy C-Means.",
    url: "https://www.dvillagrans.dev/projects/covid",
    author: {
      "@type": "Person",
      name: "Diego Villagran Salazar",
    },
  };

  return (
    <Script
      id="schema-covid"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function NycProjectSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NYC Ride-Hailing Analytics",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Streamlit dashboards and ML models for NYC Uber/Lyft trip patterns — fare prediction R² > 0.85 and 92% airport classification accuracy.",
    url: "https://www.dvillagrans.dev/projects/nyc",
    author: {
      "@type": "Person",
      name: "Diego Villagran Salazar",
    },
  };

  return (
    <Script
      id="schema-nyc"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function IndiaProjectSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "India Air Quality Intelligence",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Azure Databricks + PySpark ETL pipeline consolidating 2M+ daily IoT readings from 500+ sensors into public air quality indicators.",
    url: "https://www.dvillagrans.dev/projects/india",
    author: {
      "@type": "Person",
      name: "Diego Villagran Salazar",
    },
  };

  return (
    <Script
      id="schema-india"
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
