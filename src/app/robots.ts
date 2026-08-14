import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.dvillagrans.dev';

export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'PerplexityBot',
    'FirecrawlAgent',
    'Diffbot',
    'Bytespider',
    'CCBot',
    'GoogleOther',
    'Bingbot',
  ] as const;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
