import type { Metadata } from "next";

const BASE_URL = "https://www.dvillagrans.dev";

export const metadata: Metadata = {
  title: "About",
  description: "AI & Data Engineer · ML Systems Builder. Learn about Diego's background, systems philosophy, and technical expertise at ESCOM-IPN and EyeNet.",
  openGraph: {
    title: "About Diego Villagran | AI & Data Engineer",
    description: "Learn about Diego Villagran's background, systems architecture approach, and ML engineering expertise.",
    url: `${BASE_URL}/about`,
    images: [{ url: "/img/optimized/me-1200.webp", width: 1200, height: 630, alt: "Diego Villagran" }],
  },
  alternates: { canonical: `${BASE_URL}/about` },
};
