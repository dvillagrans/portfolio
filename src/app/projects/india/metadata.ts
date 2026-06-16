import type { Metadata } from "next";

const BASE_URL = "https://www.dvillagrans.dev";

export const metadata: Metadata = {
  title: "India Air Quality Intelligence | Diego Villagran",
  description:
    "Azure Databricks + PySpark ETL processing 2M+ daily IoT readings from 500+ sensors into public AQI indicators.",
  openGraph: {
    title: "India Air Quality Intelligence — Case Study",
    description:
      "Cloud data platform consolidating fragmented environmental IoT streams into policy-ready dashboards.",
    url: `${BASE_URL}/projects/india`,
  },
  alternates: { canonical: `${BASE_URL}/projects/india` },
};
