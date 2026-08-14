import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';

vi.mock('@ai-sdk/deepseek', () => ({
  deepseek: vi.fn().mockReturnValue('deepseek-chat-mock'),
}));

vi.mock('ai', () => ({
  streamText: vi.fn(() => ({
    toUIMessageStreamResponse: () => new Response('ok'),
  })),
  convertToModelMessages: vi.fn().mockResolvedValue([]),
}));

vi.mock('@/data/cv', () => ({
  CV_DATA: { profile: { name: 'Test' } },
}));

vi.mock('@/data/certifications', () => ({
  CERTIFICATIONS: [],
}));

vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn(),
  getRequestIdentifier: vi.fn().mockReturnValue('test-ip'),
  getScopedRequestIdentifier: vi.fn().mockReturnValue('chat:test-ip'),
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

  it('uses an endpoint-scoped rate limit identifier', async () => {
    mockedRateLimit.mockReturnValue({
      allowed: true,
      remaining: 14,
      resetAt: Date.now() + 30_000,
    });

    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'Hi' }] }),
      headers: { 'Content-Type': 'application/json' },
    });

    await POST(req);
    expect(mockedRateLimit).toHaveBeenCalledWith(
      expect.objectContaining({ identifier: 'chat:test-ip' })
    );
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

  it('returns 413 when the body exceeds the limit', async () => {
    mockedRateLimit.mockReturnValue({
      allowed: true,
      remaining: 14,
      resetAt: Date.now() + 30_000,
    });

    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'x'.repeat(200_000) }] }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(413);
  });
});
