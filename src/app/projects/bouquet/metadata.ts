import type { Metadata } from "next";

const BASE_URL = "https://www.dvillagrans.dev";

export const metadata: Metadata = {
  title: "Bouquet — Hospitality OS",
  description:
    "Full-stack multi-tenant platform for restaurant chain management. Role-based dashboards, Apache Spark analytics pipeline, and guest-facing QR ordering. Thesis project ESCOM-IPN 2026-B142.",
  openGraph: {
    title: "Bouquet — Hospitality OS Case Study",
    description:
      "Multi-tenant Hospitality OS with 52 KPIs, 3 role-based dashboards, Spark analytics pipeline, and guest QR ordering system.",
    url: `${BASE_URL}/projects/bouquet`,
  },
  alternates: { canonical: `${BASE_URL}/projects/bouquet` },
};
