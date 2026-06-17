import type { CvExperienceEntry } from "./types";

export const CV_EXPERIENCE: CvExperienceEntry[] = [
  {
    id: "eyenet",
    title: "AI & Automation Intern",
    company: "Eyenet",
    location: "Remote",
    dates: "Apr 2025 – Jun 2026",
    bullets: [
      "Designed n8n + Python automation pipelines that reduced manual document processing by 65% (~300+ docs/week).",
      "Deployed OpenAI and Gemini inference for extraction workflows, cutting data capture errors by 60% at 92% field accuracy.",
      "Built Dockerized microservices with PostgreSQL, Redis, and CI/CD handling 10,000+ daily requests in production.",
      "Architected schema-first ingestion (email, webhooks, uploads) with audit trails and Telegram alerting for ops.",
    ],
    keywords: [
      "automation",
      "n8n",
      "python",
      "fastapi",
      "docker",
      "openai",
      "gemini",
      "postgresql",
      "redis",
      "ml",
      "etl",
      "microservices",
      "ci/cd",
      "production",
    ],
  },
  {
    id: "spa-wellness",
    title: "Web Developer (Freelance)",
    company: "Melari Spa & Wellness",
    location: "Remote",
    dates: "Nov 2023 – Jul 2024",
    bullets: [
      "Delivered a conversion-focused spa website that increased inbound booking visibility for a Mexico City client.",
      "Implemented responsive UI, performance tuning, and analytics-ready structure for marketing follow-up.",
    ],
    keywords: ["web", "frontend", "react", "freelance", "seo"],
  },
];
