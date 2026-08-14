/**
 * In-memory rate limiter for API routes.
 *
 * IMPORTANT: this is best-effort, instance-local protection. It is NOT a
 * distributed rate limit. In multi-instance or serverless deployments (e.g.
 * more than one Vercel lambda, or warm instances each holding their own store)
 * the effective limit multiplies by the number of instances and state does not
 * survive cold starts. A true global limit would require an external store
 * (Upstash Redis / Vercel KV / similar), which we deliberately avoid to keep
 * this solution free of external services and dependencies.
 *
 * The store is bounded (see MAX_ENTRIES) so a flood of distinct identifiers
 * cannot grow memory without limit.
 */

export const MAX_ENTRIES = 10_000;

// Expired entries are pruned at most once every CLEANUP_INTERVAL.
const CLEANUP_INTERVAL = 5 * 60 * 1000;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
  /** Identifier for the requester (usually IP) */
  identifier: string;
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Remaining requests in the current window */
  remaining: number;
  /** Unix timestamp (ms) when the window resets */
  resetAt: number;
  /** Human-readable error message if not allowed */
  message?: string;
}

/**
 * Bounded in-memory rate-limit store.
 *
 * The optional `maxEntries` bound exists so tests can exercise eviction
 * without allocating MAX_ENTRIES entries.
 */
export class InMemoryRateLimiter {
  private readonly store = new Map<string, RateLimitEntry>();
  private lastCleanup = 0;

  constructor(private readonly maxEntries: number = MAX_ENTRIES) {}

  /** Number of tracked identifiers (exposed for tests/diagnostics). */
  get size(): number {
    return this.store.size;
  }

  /** Whether an identifier currently has an entry (exposed for tests). */
  has(identifier: string): boolean {
    return this.store.has(identifier);
  }

  /** Deterministically drop every expired entry. */
  private pruneExpired(now: number): void {
    for (const [key, entry] of this.store) {
      if (now > entry.resetAt) this.store.delete(key);
    }
  }

  private cleanup(now: number): void {
    if (now - this.lastCleanup < CLEANUP_INTERVAL) return;
    this.lastCleanup = now;
    this.pruneExpired(now);
  }

  /**
   * Free a slot when the store is at capacity. Expired entries are pruned
   * first; if still full, the entry whose window resets soonest is evicted.
   * Deterministic: on resetAt ties, Map preserves insertion order so the
   * oldest inserted entry is evicted.
   */
  private makeRoom(now: number): void {
    if (this.store.size < this.maxEntries) return;

    this.pruneExpired(now);
    if (this.store.size < this.maxEntries) return;

    let evictKey: string | undefined;
    let soonestResetAt = Infinity;
    for (const [key, entry] of this.store) {
      if (entry.resetAt < soonestResetAt) {
        soonestResetAt = entry.resetAt;
        evictKey = key;
      }
    }
    if (evictKey !== undefined) this.store.delete(evictKey);
  }

  rateLimit({ limit, windowMs, identifier }: RateLimitOptions): RateLimitResult {
    this.cleanup(Date.now());

    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || now > entry.resetAt) {
      // New window (or previously evicted entry)
      this.makeRoom(now);
      const resetAt = now + windowMs;
      this.store.set(identifier, { count: 1, resetAt });
      return { allowed: true, remaining: limit - 1, resetAt };
    }

    entry.count += 1;

    if (entry.count > limit) {
      const resetInSeconds = Math.ceil((entry.resetAt - now) / 1000);
      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.resetAt,
        message: `Rate limit exceeded. Try again in ${resetInSeconds}s.`,
      };
    }

    return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
  }
}

const defaultLimiter = new InMemoryRateLimiter();

export function rateLimit(options: RateLimitOptions): RateLimitResult {
  return defaultLimiter.rateLimit(options);
}

/**
 * Extract a stable identifier from a Next.js request.
 *
 * Order of preference:
 *  1. `x-real-ip` — set by the reverse proxy / edge runtime, trusted source.
 *  2. First entry of `x-forwarded-for` — documented fallback. Behind
 *     Vercel/Cloudflare the platform overwrites this header with the real
 *     client IP, so it is safe there; a directly reachable origin could spoof
 *     it, which is exactly why it is only used as a fallback and never trusted
 *     blindly over a list of arbitrary proxies.
 *  3. Stable `anonymous` key — only when no proxy supplied any IP signal.
 *     Requests without an IP share one bucket, a documented best-effort
 *     limitation; any available proxy signal above is preferred so unrelated
 *     clients are not accidentally grouped together.
 */
export function getRequestIdentifier(request: Request): string {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }

  return "anonymous";
}

/**
 * Namespace a request identifier per endpoint so different API routes (chat,
 * cv-builder, interview, contact) never share a rate-limit bucket for the same
 * client. All routes share the single in-memory store, so without this prefix
 * a burst on one endpoint would consume the others' limits too.
 */
export function getScopedRequestIdentifier(request: Request, scope: string): string {
  return `${scope}:${getRequestIdentifier(request)}`;
}
