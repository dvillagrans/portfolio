import type { Metadata } from "next";

const BASE_URL = "https://www.dvillagrans.dev";

export const metadata: Metadata = {
  title: "COVID-19 Risk Profiles | Diego Villagran",
  description:
    "Clustering 30M+ open Mexican health records into 9 interpretable COVID-19 risk profiles with K-Means and Fuzzy C-Means.",
  openGraph: {
    title: "COVID-19 Risk Profiles — Case Study",
    description:
      "Academic data science project: stratified sampling, dual clustering, LaTeX report, and public Next.js dashboard.",
    url: `${BASE_URL}/projects/covid`,
  },
  alternates: { canonical: `${BASE_URL}/projects/covid` },
};
