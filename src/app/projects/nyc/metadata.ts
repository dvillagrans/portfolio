import type { Metadata } from "next";

const BASE_URL = "https://www.dvillagrans.dev";

export const metadata: Metadata = {
  title: "NYC Ride-Hailing Analytics",
  description:
    "Streamlit dashboards and ML models for NYC Uber/Lyft patterns — fare prediction R² > 0.85 and 92% airport classification.",
  openGraph: {
    title: "NYC Ride-Hailing Analytics — Case Study",
    description:
      "Explainable mobility analytics with geospatial dashboards, regression models, and live Streamlit deployment.",
    url: `${BASE_URL}/projects/nyc`,
  },
  alternates: { canonical: `${BASE_URL}/projects/nyc` },
};
