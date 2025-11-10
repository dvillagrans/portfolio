import { DATA } from "@/data/resume";

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": DATA.name,
    "jobTitle": "Data Scientist & Full-Stack Developer",
    "description": DATA.description,
    "url": DATA.url,
    "image": `${DATA.url}/img/optimized/me-128.webp`,
    "sameAs": [
      DATA.contact.social.LinkedIn.url,
      DATA.contact.social.GitHub.url
    ],
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "ESCOM-IPN"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "ESCOM-IPN"
    },
    "knowsAbout": [
      "Data Science",
      "Machine Learning",
      "Python",
      "React",
      "Full-Stack Development",
      "Artificial Intelligence",
      "Data Visualization",
      "Web Development"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mexico City",
      "addressCountry": "MX"
    },
    "email": DATA.contact.email,
    "telephone": DATA.contact.tel
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `Portfolio de ${DATA.name}`,
    "url": DATA.url,
    "description": DATA.description,
    "author": {
      "@type": "Person",
      "name": DATA.name
    },
    "inLanguage": "es-MX",
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@type": "Person",
      "name": DATA.name
    }
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `Servicios de Data Science - ${DATA.name}`,
    "description": "Servicios profesionales de ciencia de datos, machine learning y desarrollo full-stack",
    "provider": {
      "@type": "Person",
      "name": DATA.name
    },
    "areaServed": "Mexico",
    "serviceType": [
      "Data Science",
      "Machine Learning",
      "Full-Stack Development",
      "Data Analysis",
      "Web Development"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
}