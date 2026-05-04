import type { Metadata } from "next";

const BASE_URL = "https://www.dvillagrans.dev";

export const metadata: Metadata = {
  title: "TimeUp — SaaS Time Tracking Platform | Diego Villagran",
  description: "Multi-tenant cloud platform for health & wellness sector. Biometric Passkeys, real-time WebSocket sync, and serverless architecture. MVP built in 10 weeks.",
  openGraph: {
    title: "TimeUp — SaaS Platform Case Study",
    description: "Multi-tenant SaaS with biometric WebAuthn login, WebSocket isolation, and Supabase serverless architecture.",
    url: `${BASE_URL}/projects/timeup`,
  },
  alternates: { canonical: `${BASE_URL}/projects/timeup` },
};
