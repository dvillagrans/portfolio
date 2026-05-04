import type { Metadata } from "next";

const BASE_URL = "https://www.dvillagrans.dev";

export const metadata: Metadata = {
  title: "Projects Archive — Diego Villagran",
  description: "Complete archive of data science, analytics, ML engineering, and full-stack projects by Diego Villagran. 15+ systems built across AI, ETL, and web platforms.",
  openGraph: {
    title: "Projects Archive | Diego Villagran",
    description: "15+ projects across AI, data engineering, analytics, and full-stack development. From LLM pipelines to real-time SaaS.",
    url: `${BASE_URL}/projects`,
  },
  alternates: { canonical: `${BASE_URL}/projects` },
};
