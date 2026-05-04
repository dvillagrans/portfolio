/**
 * Simple in-memory rate limiter for API routes.
 * For production with multiple instances, swap to Vercel KV or Upstash Redis.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
  /** Identifier for the requester (usually IP) */
  identifier: string;
}

interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Remaining requests in the current window */
  remaining: number;
  /** Unix timestamp (ms) when the window resets */
  resetAt: number;
  /** Human-readable error message if not allowed */
  message?: string;
}

export function rateLimit({ limit, windowMs, identifier }: RateLimitOptions): RateLimitResult {
  cleanup();

  const now = Date.now();
  const key = identifier;
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // New window
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  entry.count++;

  if (entry.count > limit) {
    const resetInSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
      message: `Rate limit exceeded. Try again in ${resetInSeconds}s.`,
    };
  }

  return {
    allowed: true,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Extract a consistent identifier from a Next.js request.
 * Uses x-forwarded-for header (standard behind proxies/Vercel) or falls back to a hash.
 */
export function getRequestIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  // Fallback: use x-real-ip or a generic identifier
  const realIp = request.headers.get('x-real-ip');
  return realIp || 'local';
}
