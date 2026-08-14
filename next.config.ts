import type { NextConfig } from "next";

// CSP is split by environment. Development allows unsafe-eval (Next dev
// HMR/source maps) and unpkg.com + react-grab.dev for the react-grab dev
// tooling loaded in layout.tsx. Production drops both: no eval and no
// third-party script hosts. headers() is evaluated per request at runtime,
// so NODE_ENV reflects the running server, not the build.
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  async headers() {
    const scriptSrc = [
      "'self'",
      "'unsafe-inline'",
      ...(isDev ? ["'unsafe-eval'", "https://unpkg.com"] : []),
      "https://*.vercel-insights.com",
    ];

    const connectSrc = [
      "'self'",
      "https://api.deepseek.com",
      "https://api.resend.com",
      "https://*.vercel-insights.com",
      ...(isDev ? ["https://*.react-grab.dev"] : []),
    ];

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src ${scriptSrc.join(" ")}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              `connect-src ${connectSrc.join(" ")}`,
              "frame-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/projects/covid-perfiles",
        destination: "/projects/covid",
        permanent: true,
      },
      {
        source: "/projects/india-air-quality",
        destination: "/projects/india",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
