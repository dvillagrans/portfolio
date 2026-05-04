import type { Metadata } from "next";

const BASE_URL = "https://www.dvillagrans.dev";

export const metadata: Metadata = {
  title: "EyeNet — AI & Automation Systems | Diego Villagran",
  description: "Full AI infrastructure: LLM pipelines, ETL/ELT, containerized microservices, and production apps. 65% reduction in manual work, 300+ docs/week, 92% extraction accuracy.",
  openGraph: {
    title: "EyeNet — AI & Automation Systems Case Study",
    description: "How we built hybrid AI infrastructure with a private GPU cluster, sub-agent architecture, and multi-layered orchestration handling 10K+ daily requests.",
    url: `${BASE_URL}/projects/eyenet`,
  },
  alternates: { canonical: `${BASE_URL}/projects/eyenet` },
};
