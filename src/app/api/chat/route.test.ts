import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';

vi.mock('@ai-sdk/deepseek', () => ({
  deepseek: vi.fn().mockReturnValue('deepseek-chat-mock'),
}));

vi.mock('ai', () => ({
  streamText: vi.fn(),
  convertToModelMessages: vi.fn().mockResolvedValue([]),
}));

vi.mock('@/data/resume', () => ({
  DATA: { name: 'Test' },
}));

vi.mock('@/data/certifications', () => ({
  CERTIFICATIONS: [],
}));

vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn(),
  getRequestIdentifier: vi.fn().mockReturnValue('test-ip'),
}));

import { rateLimit } from '@/lib/rate-limit';

const mockedRateLimit = vi.mocked(rateLimit);

describe('POST /api/chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 429 when rate limited', async () => {
    const resetAt = Date.now() + 30_000;
    mockedRateLimit.mockReturnValue({
      allowed: false,
      remaining: 0,
      resetAt,
      message: 'Rate limit exceeded. Try again in 30s.',
    });

    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'Hi' }] }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(429);

    const json = await res.json();
    expect(json.error).toContain('Rate limit exceeded');
  });

  it('includes rate limit headers on 429', async () => {
    const resetAt = Date.now() + 45_000;
    mockedRateLimit.mockReturnValue({
      allowed: false,
      remaining: 0,
      resetAt,
      message: 'Slow down.',
    });

    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [] }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(429);
    expect(res.headers.get('X-RateLimit-Remaining')).toBe('0');
    expect(res.headers.get('X-RateLimit-Reset')).toBe(String(resetAt));
    expect(Number(res.headers.get('Retry-After'))).toBeGreaterThan(0);
  });
});
