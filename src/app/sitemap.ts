import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.dvillagrans.dev';

// Stable last-modified date for static routes — avoid new Date() per build
const LAST_MODIFIED = '2026-06-18';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 1,
      images: [`${BASE_URL}/img/portfolio.webp`],
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      images: [`${BASE_URL}/img/optimized/me-1200.webp`],
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects/eyenet`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [`${BASE_URL}/img/eyenet.webp`],
    },
    {
      url: `${BASE_URL}/projects/covid`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [`${BASE_URL}/img/dashboard-covid-19.webp`],
    },
    {
      url: `${BASE_URL}/projects/nyc`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [`${BASE_URL}/img/nyc-ridehailing-dashboard.webp`],
    },
    {
      url: `${BASE_URL}/projects/india`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [`${BASE_URL}/img/india-air-quality.webp`],
    },
    {
      url: `${BASE_URL}/projects/bouquet`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects/timeup`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [`${BASE_URL}/img/timeup-mock.webp`],
    },
    {
      url: `${BASE_URL}/now`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  return staticRoutes;
}
