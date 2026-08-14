import { describe, it, expect } from 'vitest';
import robots from './robots';

const AI_CRAWLERS = [
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

type NormalizedRule = {
  userAgent: string;
  allow?: string | string[];
  disallow?: string[];
};

function allRules(): NormalizedRule[] {
  const { rules } = robots();
  return (Array.isArray(rules) ? rules : [rules]).map((rule) => ({
    userAgent: Array.isArray(rule.userAgent) ? rule.userAgent.join(',') : rule.userAgent ?? '',
    allow: rule.allow,
    disallow: Array.isArray(rule.disallow) ? rule.disallow : rule.disallow ? [rule.disallow] : undefined,
  }));
}

describe('robots()', () => {
  it('keeps /api/ and /_next/ blocked for the wildcard user agent', () => {
    const wildcard = allRules().find((rule) => rule.userAgent === '*')!;
    expect(wildcard).toBeDefined();
    expect(wildcard.allow).toBe('/');
    expect(wildcard.disallow).toEqual(expect.arrayContaining(['/api/', '/_next/']));
  });

  it('explicitly allows / for every AI crawler', () => {
    const rules = allRules();
    for (const crawler of AI_CRAWLERS) {
      const rule = rules.find((r) => r.userAgent === crawler)!;
      expect(rule, `${crawler} should have an allow rule`).toBeDefined();
      expect(rule.allow).toBe('/');
      expect(rule.disallow).toBeUndefined();
    }
  });

  it('never blocks the whole site for any user agent', () => {
    for (const rule of allRules()) {
      expect(rule.disallow ?? []).not.toContain('/');
    }
  });
});
