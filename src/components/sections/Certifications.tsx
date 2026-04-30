"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Image from "next/image";
import { Award, ExternalLink, Link2, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  slug: string;
  title: string;
  issuer: string;
  image: string;
  skills: string[];
  verifyUrl?: string;
}

const certificatesData: Record<string, Certificate[]> = {
  en: [
    {
      slug: "generative-ai-llms",
      title: "Generative AI with Large Language Models",
      issuer: "DeepLearning.AI - Coursera",
      image: "/certificados/Coursera.webp",
      skills: ["LLMs", "RLHF", "Transformers", "PEFT"],
      verifyUrl: "https://coursera.org/share/670b15ffaa93a2b32ef0bc8803b48fa0",
    },
    {
      slug: "python-data-science-udemy",
      title: "Data Science en Python Desde Cero + ChatGPT",
      issuer: "Udemy",
      image: "/certificados/Udemy_DC.webp",
      skills: ["Python", "Data Science", "ChatGPT", "Pandas"],
      verifyUrl: "https://www.udemy.com/certificate/UC-f5d5c1ca-020e-4281-aef7-cb02cb25d01d/",
    },
    {
      slug: "google-ai-essentials",
      title: "Google AI Essentials V1",
      issuer: "Google - Coursera",
      image: "/certificados/google-ai-essentials-v1.png",
      skills: ["Generative AI", "Prompt Engineering", "AI Ethics"],
      verifyUrl: "https://www.credly.com/badges/1e3dfdbc-ec96-4e7c-a6e6-351eefae2390",
    },
    {
      slug: "google-cloud",
      title: "Google Cloud Computing Foundations",
      issuer: "Google Cloud",
      image: "/certificados/googlecloud.webp",
      skills: ["BigQuery", "Kubernetes", "Networking", "ML Engine", "Cloud Storage"],
      verifyUrl: "https://www.credly.com/badges/93bc9ccd-a8c6-4dca-b2e3-2b4d483beefe",
    },
    {
      slug: "docker-udemy",
      title: "Docker & Docker Compose",
      issuer: "Udemy",
      image: "/certificados/Udemy_DC.webp",
      skills: ["Docker", "Containerization", "DevOps"],
    },
    {
      slug: "docker-datacamp",
      title: "Introduction to Docker",
      issuer: "DataCamp",
      image: "/certificados/docker.webp",
      skills: ["Docker", "Containers", "CI/CD"],
      verifyUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/course/987dd238b61eaad76c0784e8bed1511c3eba9e78",
    },
    {
      slug: "sql-intermediate-datacamp",
      title: "Intermediate SQL",
      issuer: "DataCamp",
      image: "/certificados/sql-inter.png",
      skills: ["SQL", "Joins", "Subqueries", "Aggregations"],
      verifyUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/course/9513ed23df423a9d3cc9dbdaf50e3e801f0e2541",
    },
    {
      slug: "oracle-database",
      title: "Oracle Database",
      issuer: "Oracle",
      image: "/certificados/Curso_Oracle.webp",
      skills: ["SQL", "PostgreSQL", "Database Design"],
    },
    {
      slug: "github-actions",
      title: "GitHub Actions",
      issuer: "GitHub",
      image: "/certificados/CursoGitHubActitions.webp",
      skills: ["CI/CD", "Automation", "DevOps"],
    },
    {
      slug: "coursera-specialization",
      title: "Specialization Certificate",
      issuer: "Coursera",
      image: "/certificados/Coursera.webp",
      skills: ["Software Engineering", "Best Practices"],
    },
  ],
  es: [
    {
      slug: "generative-ai-llms",
      title: "IA Generativa con Modelos de Lenguaje Extensos (LLMs)",
      issuer: "DeepLearning.AI - Coursera",
      image: "/certificados/Coursera.webp",
      skills: ["LLMs", "RLHF", "Transformers", "PEFT"],
      verifyUrl: "https://coursera.org/share/670b15ffaa93a2b32ef0bc8803b48fa0",
    },
    {
      slug: "python-data-science-udemy",
      title: "Data Science en Python Desde Cero + ChatGPT",
      issuer: "Udemy",
      image: "/certificados/Udemy_DC.webp",
      skills: ["Python", "Ciencia de Datos", "ChatGPT", "Pandas"],
      verifyUrl: "https://www.udemy.com/certificate/UC-f5d5c1ca-020e-4281-aef7-cb02cb25d01d/",
    },
    {
      slug: "google-ai-essentials",
      title: "Google AI Essentials V1",
      issuer: "Google - Coursera",
      image: "/certificados/google-ai-essentials-v1.png",
      skills: ["IA Generativa", "Prompt Engineering", "Ética de IA"],
      verifyUrl: "https://www.credly.com/badges/1e3dfdbc-ec96-4e7c-a6e6-351eefae2390",
    },
    {
      slug: "google-cloud",
      title: "Google Cloud Computing Foundations",
      issuer: "Google Cloud",
      image: "/certificados/googlecloud.webp",
      skills: ["BigQuery", "Kubernetes", "Redes", "ML Engine", "Cloud Storage"],
      verifyUrl: "https://www.credly.com/badges/93bc9ccd-a8c6-4dca-b2e3-2b4d483beefe",
    },
    {
      slug: "docker-udemy",
      title: "Docker & Docker Compose",
      issuer: "Udemy",
      image: "/certificados/Udemy_DC.webp",
      skills: ["Docker", "Contenedores", "DevOps"],
    },
    {
      slug: "docker-datacamp",
      title: "Introducción a Docker",
      issuer: "DataCamp",
      image: "/certificados/docker.webp",
      skills: ["Docker", "Contenedores", "CI/CD"],
      verifyUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/course/987dd238b61eaad76c0784e8bed1511c3eba9e78",
    },
    {
      slug: "sql-intermediate-datacamp",
      title: "SQL Intermedio",
      issuer: "DataCamp",
      image: "/certificados/sql-inter.png",
      skills: ["SQL", "Joins", "Subconsultas", "Agregaciones"],
      verifyUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/course/9513ed23df423a9d3cc9dbdaf50e3e801f0e2541",
    },
    {
      slug: "oracle-database",
      title: "Base de Datos Oracle",
      issuer: "Oracle",
      image: "/certificados/Curso_Oracle.webp",
      skills: ["SQL", "PostgreSQL", "Diseño de Bases de Datos"],
    },
    {
      slug: "github-actions",
      title: "GitHub Actions",
      issuer: "GitHub",
      image: "/certificados/CursoGitHubActitions.webp",
      skills: ["CI/CD", "Automatización", "DevOps"],
    },
    {
      slug: "coursera-specialization",
      title: "Certificado de Especialización",
      issuer: "Coursera",
      image: "/certificados/Coursera.webp",
      skills: ["Ingeniería de Software", "Mejores Prácticas"],
    },
  ],
};

function getCertUrl(slug: string) {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/about#${slug}`;
}

export default function Certifications() {
  const container = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const reduced = useReducedMotion();

  const certificates = certificatesData[language] || certificatesData.en;

  const openCert = useCallback(
    (slug: string) => {
      const cert = certificates.find((c) => c.slug === slug);
      if (cert) {
        setSelectedCert(cert);
      }
    },
    [certificates]
  );

  // Handle hash navigation on mount
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    if (hash === "certificaciones" || hash === "certifications") {
      // Scroll to section
      setTimeout(() => {
        container.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      // Try to open specific certificate
      const cert = certificates.find((c) => c.slug === hash);
      if (cert) {
        setTimeout(() => {
          setSelectedCert(cert);
          // Also scroll to section
          container.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 400);
      }
    }
  }, [certificates]);

  // Update URL hash when modal opens/closes
  useEffect(() => {
    if (selectedCert) {
      window.history.replaceState(null, "", `#${selectedCert.slug}`);
    } else {
      // Only clear if we're in the certificaciones section
      const currentHash = window.location.hash.replace("#", "");
      const certSlugs = certificates.map((c) => c.slug);
      if (certSlugs.includes(currentHash)) {
        window.history.replaceState(null, "", "#certificaciones");
      }
    }
  }, [selectedCert, certificates]);

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        cardsRef.current.forEach((el) => {
          if (!el) return;
          gsap.set(el, { opacity: 1, y: 0 });
        });
        return;
      }

      cardsRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
            delay: (index % 3) * 0.1,
          }
        );
      });
    }, container);
    return () => ctx.revert();
  }, [reduced, language]);

  const handleCopyLink = async (slug: string) => {
    const url = getCertUrl(slug);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <section
        ref={container}
        id="certificaciones"
        className="border-t border-charcoal/10 pt-24 scroll-mt-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <h2 className="md:col-span-4 font-sans text-[10px] font-bold uppercase tracking-widest text-warm pt-2 border-t-2 border-warm/30 md:border-transparent md:pt-0 flex items-center gap-2">
            <Award className="h-3.5 w-3.5" />
            {language === "en" ? "Certifications" : "Certificaciones"}
          </h2>
          <div className="md:col-span-8">
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-charcoal/80 mb-2">
              {language === "en"
                ? "Continuous learning backed by industry-recognized credentials."
                : "Aprendizaje continuo respaldado por credenciales reconocidas en la industria."}
            </p>
          </div>
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, idx) => (
            <div
              key={cert.slug}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              onClick={() => setSelectedCert(cert)}
              className="group relative bg-white border border-charcoal/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-warm/30 transition-all duration-500 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/5">
                <Image
                  src={cert.image}
                  alt={`${cert.title} - ${cert.issuer}`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <ExternalLink className="h-3.5 w-3.5 text-charcoal" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-warm">
                    {cert.issuer}
                  </span>
                </div>
                <h3 className="font-sans text-sm font-semibold text-charcoal leading-snug mb-3 group-hover:text-warm transition-colors duration-300">
                  {cert.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-block px-2 py-0.5 rounded-md bg-charcoal/5 text-[10px] font-medium text-charcoal/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl modal-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={selectedCert.image}
                alt={`${selectedCert.title} - ${selectedCert.issuer}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-warm">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="font-sans text-lg font-semibold text-charcoal mt-1">
                    {selectedCert.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3 mb-6">
                {selectedCert.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-block px-2.5 py-1 rounded-md bg-charcoal/5 text-xs font-medium text-charcoal/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-charcoal/10">
                <button
                  onClick={() => handleCopyLink(selectedCert.slug)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-charcoal text-offwhite font-sans text-[11px] font-semibold uppercase tracking-wider hover:bg-warm hover:text-charcoal transition-colors active:scale-[0.98]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      {language === "en" ? "Copied!" : "¡Copiado!"}
                    </>
                  ) : (
                    <>
                      <Link2 className="h-3.5 w-3.5" />
                      {language === "en" ? "Copy link" : "Copiar enlace"}
                    </>
                  )}
                </button>

                {selectedCert.verifyUrl && (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-charcoal/15 font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/70 hover:border-warm/50 hover:text-charcoal transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {language === "en" ? "Verify" : "Verificar"}
                  </a>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
              aria-label="Close"
            >
              <svg
                className="h-4 w-4 text-charcoal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
