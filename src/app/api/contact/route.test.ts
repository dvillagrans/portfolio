import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';

const mockSend = vi.fn();

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: (...args: unknown[]) => mockSend(...args) } };
  }),
}));

vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn(),
  getRequestIdentifier: vi.fn().mockReturnValue('test-ip'),
}));

import { rateLimit } from '@/lib/rate-limit';

const mockedRateLimit = vi.mocked(rateLimit);

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 429 when rate limited', async () => {
    mockedRateLimit.mockReturnValue({
      allowed: false,
      remaining: 0,
      resetAt: Date.now() + 60_000,
      message: 'Rate limit exceeded. Try again in 60s.',
    });

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test', email: 'test@example.com', message: 'Hello' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(429);

    const json = await res.json();
    expect(json.error).toContain('Rate limit exceeded');
    expect(res.headers.get('X-RateLimit-Remaining')).toBe('0');
    expect(res.headers.get('Retry-After')).toBeTruthy();
  });

  it('returns 400 for missing fields', async () => {
    mockedRateLimit.mockReturnValue({
      allowed: true,
      remaining: 2,
      resetAt: Date.now() + 60_000,
    });

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: '', email: 'test@example.com', message: 'Hello' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toBe('Missing required fields');
  });

  it('returns 400 when all fields are missing', async () => {
    mockedRateLimit.mockReturnValue({
      allowed: true,
      remaining: 2,
      resetAt: Date.now() + 60_000,
    });

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toBe('Missing required fields');
  });
});
