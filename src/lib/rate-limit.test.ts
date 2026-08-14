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

describe('InMemoryRateLimiter bounded store', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('caps the number of tracked entries at maxEntries', async () => {
    const { InMemoryRateLimiter } = await import('@/lib/rate-limit');
    const limiter = new InMemoryRateLimiter(2);

    limiter.rateLimit({ limit: 5, windowMs: 60_000, identifier: 'a' });
    limiter.rateLimit({ limit: 5, windowMs: 60_000, identifier: 'b' });
    limiter.rateLimit({ limit: 5, windowMs: 60_000, identifier: 'c' });
    limiter.rateLimit({ limit: 5, windowMs: 60_000, identifier: 'd' });

    expect(limiter.size).toBe(2);
  });

  it('evicts the entry with the soonest resetAt when at capacity', async () => {
    const { InMemoryRateLimiter } = await import('@/lib/rate-limit');
    const limiter = new InMemoryRateLimiter(2);

    limiter.rateLimit({ limit: 5, windowMs: 100_000, identifier: 'oldest' }); // resetAt = 100_000
    vi.advanceTimersByTime(60_000);
    limiter.rateLimit({ limit: 5, windowMs: 100_000, identifier: 'newest' }); // resetAt = 160_000
    expect(limiter.has('oldest')).toBe(true);
    expect(limiter.has('newest')).toBe(true);

    // At capacity: adding a third must evict 'oldest' (soonest resetAt).
    limiter.rateLimit({ limit: 5, windowMs: 100_000, identifier: 'third' });
    expect(limiter.has('oldest')).toBe(false);
    expect(limiter.has('newest')).toBe(true);
    expect(limiter.has('third')).toBe(true);
    expect(limiter.size).toBe(2);
  });

  it('prunes expired entries before evicting live ones at capacity', async () => {
    const { InMemoryRateLimiter } = await import('@/lib/rate-limit');
    const limiter = new InMemoryRateLimiter(2);

    limiter.rateLimit({ limit: 5, windowMs: 100_000, identifier: 'expiring' }); // resetAt = 100_000
    vi.advanceTimersByTime(60_000);
    limiter.rateLimit({ limit: 5, windowMs: 100_000, identifier: 'live' }); // resetAt = 160_000
    expect(limiter.size).toBe(2);

    vi.advanceTimersByTime(50_000); // now t = 110_000 → 'expiring' is expired
    limiter.rateLimit({ limit: 5, windowMs: 100_000, identifier: 'incoming' });

    expect(limiter.has('expiring')).toBe(false);
    expect(limiter.has('live')).toBe(true);
    expect(limiter.has('incoming')).toBe(true);
    expect(limiter.size).toBe(2);
  });

  it('gives an evicted identifier a fresh window instead of failing', async () => {
    const { InMemoryRateLimiter } = await import('@/lib/rate-limit');
    const limiter = new InMemoryRateLimiter(1);

    limiter.rateLimit({ limit: 1, windowMs: 60_000, identifier: 'a' });
    limiter.rateLimit({ limit: 1, windowMs: 60_000, identifier: 'b' }); // evicts 'a'

    const again = limiter.rateLimit({ limit: 1, windowMs: 60_000, identifier: 'a' });
    expect(again.allowed).toBe(true);
    expect(limiter.size).toBe(1);
  });
});

describe('getRequestIdentifier', () => {
  it('prefers x-real-ip over x-forwarded-for', async () => {
    const { getRequestIdentifier } = await import('@/lib/rate-limit');
    const req = new Request('http://localhost', {
      headers: {
        'x-real-ip': '1.1.1.1',
        'x-forwarded-for': '9.9.9.9, 8.8.8.8',
      },
    });
    expect(getRequestIdentifier(req)).toBe('1.1.1.1');
  });

  it('uses the first x-forwarded-for entry as fallback when x-real-ip is absent', async () => {
    const { getRequestIdentifier } = await import('@/lib/rate-limit');
    const req = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' },
    });
    expect(getRequestIdentifier(req)).toBe('1.2.3.4');
  });

  it('falls back to x-real-ip alone', async () => {
    const { getRequestIdentifier } = await import('@/lib/rate-limit');
    const req = new Request('http://localhost', {
      headers: { 'x-real-ip': '9.9.9.9' },
    });
    expect(getRequestIdentifier(req)).toBe('9.9.9.9');
  });

  it('falls back to a stable key when no IP signal is present', async () => {
    const { getRequestIdentifier } = await import('@/lib/rate-limit');
    const req = new Request('http://localhost');
    expect(getRequestIdentifier(req)).toBe('anonymous');
  });
});

describe('getScopedRequestIdentifier', () => {
  it('namespaces the identifier per endpoint scope', async () => {
    const { getScopedRequestIdentifier } = await import('@/lib/rate-limit');
    const req = new Request('http://localhost', {
      headers: { 'x-real-ip': '1.1.1.1' },
    });
    expect(getScopedRequestIdentifier(req, 'chat')).toBe('chat:1.1.1.1');
    expect(getScopedRequestIdentifier(req, 'cv-builder')).toBe('cv-builder:1.1.1.1');
  });

  it('keeps anonymous requests scoped too', async () => {
    const { getScopedRequestIdentifier } = await import('@/lib/rate-limit');
    const req = new Request('http://localhost');
    expect(getScopedRequestIdentifier(req, 'interview')).toBe('interview:anonymous');
  });
});
