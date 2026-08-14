import type { Metadata } from "next";

const BASE_URL = "https://www.dvillagrans.dev";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Diego Villagran is working on right now: production ML pipelines and LLM automation at EyeNet, a private GPU cluster for open-source models, and Data Science studies at ESCOM-IPN. Updated June 2025.",
  openGraph: {
    title: "Now | Diego Villagran",
    description:
      "Current focus and recent learnings of Diego Villagran — ML pipelines, LLM automation, and data engineering.",
    url: `${BASE_URL}/now`,
  },
  alternates: { canonical: `${BASE_URL}/now` },
};
