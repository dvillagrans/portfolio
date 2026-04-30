import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/covid-perfiles",
        destination: "https://covid.dvillagrans.dev",
        permanent: true,
      },
      {
        source: "/projects/india-air-quality",
        destination: "https://aqi-india.dvillagrans.dev",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
