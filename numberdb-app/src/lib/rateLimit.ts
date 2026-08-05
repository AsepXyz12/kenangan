/**
 * Lightweight in-memory rate limiter, keyed by identifier (e.g. IP + username).
 *
 * NOTE: this resets whenever the serverless function cold-starts, which is fine
 * as a first line of defense on Vercel. For stricter guarantees across
 * instances, swap this for a Redis-backed limiter (e.g. Upstash) — the
 * `checkRateLimit` signature below is intentionally simple to make that swap
 * a drop-in replacement later.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export function checkRateLimit(
  key: string,
  max = Number(process.env.LOGIN_RATE_LIMIT_MAX || 5),
  windowMs = Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MS || 60000)
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, retryAfterMs: 0 };
  }

  if (existing.count >= max) {
    return { allowed: false, remaining: 0, retryAfterMs: existing.resetAt - now };
  }

  existing.count += 1;
  return { allowed: true, remaining: max - existing.count, retryAfterMs: 0 };
}
