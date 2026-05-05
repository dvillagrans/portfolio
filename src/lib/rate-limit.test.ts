import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// We use dynamic imports to get a fresh module (and fresh store) per test,
// since the store is module-level state.
describe('rateLimit', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows requests under the limit', async () => {
    const { rateLimit } = await import('@/lib/rate-limit');
    const result = rateLimit({ limit: 3, windowMs: 60_000, identifier: 'user-a' });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it('blocks requests over the limit', async () => {
    const { rateLimit } = await import('@/lib/rate-limit');
    const limit = 2;

    // First two requests allowed
    rateLimit({ limit, windowMs: 60_000, identifier: 'user-b' });
    rateLimit({ limit, windowMs: 60_000, identifier: 'user-b' });

    // Third request blocked
    const result = rateLimit({ limit, windowMs: 60_000, identifier: 'user-b' });
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.message).toContain('Rate limit exceeded');
  });

  it('resets after window expires', async () => {
    const { rateLimit } = await import('@/lib/rate-limit');
    const limit = 1;
    const windowMs = 60_000;

    // Exhaust the limit
    const first = rateLimit({ limit, windowMs, identifier: 'user-c' });
    expect(first.allowed).toBe(true);

    const blocked = rateLimit({ limit, windowMs, identifier: 'user-c' });
    expect(blocked.allowed).toBe(false);

    // Advance past the window
    vi.advanceTimersByTime(windowMs + 1);

    // Should be allowed again
    const reset = rateLimit({ limit, windowMs, identifier: 'user-c' });
    expect(reset.allowed).toBe(true);
    expect(reset.remaining).toBe(0);
  });

  it('gives independent limits to different identifiers', async () => {
    const { rateLimit } = await import('@/lib/rate-limit');
    const limit = 1;
    const windowMs = 60_000;

    // Exhaust limit for user-d
    rateLimit({ limit, windowMs, identifier: 'user-d' });
    const blocked = rateLimit({ limit, windowMs, identifier: 'user-d' });
    expect(blocked.allowed).toBe(false);

    // user-e should still be allowed
    const allowed = rateLimit({ limit, windowMs, identifier: 'user-e' });
    expect(allowed.allowed).toBe(true);
  });
});

describe('getRequestIdentifier', () => {
  it('returns x-forwarded-for when present', async () => {
    const { getRequestIdentifier } = await import('@/lib/rate-limit');
    const req = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' },
    });
    expect(getRequestIdentifier(req)).toBe('1.2.3.4');
  });

  it('falls back to x-real-ip', async () => {
    const { getRequestIdentifier } = await import('@/lib/rate-limit');
    const req = new Request('http://localhost', {
      headers: { 'x-real-ip': '9.9.9.9' },
    });
    expect(getRequestIdentifier(req)).toBe('9.9.9.9');
  });

  it('falls back to "local" when no headers present', async () => {
    const { getRequestIdentifier } = await import('@/lib/rate-limit');
    const req = new Request('http://localhost');
    expect(getRequestIdentifier(req)).toBe('local');
  });
});
