import type { Metadata } from "next";

const BASE_URL = "https://www.dvillagrans.dev";

export const metadata: Metadata = {
  title: "CV Builder",
  description:
    "Personal AI tool that turns a job description into a tailored resume and cover letter for Diego Villagran.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: { canonical: `${BASE_URL}/cv-builder` },
};
