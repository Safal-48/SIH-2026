/**
 * Vaidya Setu - Sliding Window Rate Limiter
 * Protects critical endpoints from brute-force, scraping, and denial-of-service attempts.
 */

import { NextRequest } from "next/server";

export type RateLimitTier = "GENERAL_API" | "DOCUMENT_UPLOAD" | "AUTH_LOGIN" | "SENSITIVE_ACTIONS";

interface TierConfig {
  maxRequests: number;
  windowSeconds: number;
}

export const RATE_LIMIT_TIERS: Record<RateLimitTier, TierConfig> = {
  GENERAL_API: { maxRequests: 60, windowSeconds: 60 },
  DOCUMENT_UPLOAD: { maxRequests: 5, windowSeconds: 60 },
  AUTH_LOGIN: { maxRequests: 10, windowSeconds: 900 }, // 10 attempts per 15 minutes
  SENSITIVE_ACTIONS: { maxRequests: 15, windowSeconds: 60 },
};

interface TokenBucketEntry {
  count: number;
  windowStart: number;
}

// In-memory sliding bucket store
const bucketStore = new Map<string, TokenBucketEntry>();

/**
 * Clean up expired rate limiting entries every 10 minutes to prevent memory leak
 */
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    bucketStore.forEach((entry, key) => {
      if (now - entry.windowStart > 1800 * 1000) {
        bucketStore.delete(key);
      }
    });
  }, 10 * 60 * 1000);
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
  retryAfterSeconds: number;
}

/**
 * Extracts Client IP Address securely from request headers
 */
export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

/**
 * Evaluates rate limit for a given key and tier.
 */
export function checkRateLimit(key: string, tier: RateLimitTier = "GENERAL_API"): RateLimitResult {
  const config = RATE_LIMIT_TIERS[tier];
  const now = Date.now();
  const bucketKey = `${tier}:${key}`;
  const windowMs = config.windowSeconds * 1000;

  const entry = bucketStore.get(bucketKey);

  if (!entry || now - entry.windowStart > windowMs) {
    // New window
    bucketStore.set(bucketKey, {
      count: 1,
      windowStart: now,
    });
    return {
      allowed: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      resetSeconds: config.windowSeconds,
      retryAfterSeconds: 0,
    };
  }

  // Inside active window
  if (entry.count >= config.maxRequests) {
    const elapsedSeconds = Math.floor((now - entry.windowStart) / 1000);
    const retryAfter = Math.max(1, config.windowSeconds - elapsedSeconds);

    return {
      allowed: false,
      limit: config.maxRequests,
      remaining: 0,
      resetSeconds: retryAfter,
      retryAfterSeconds: retryAfter,
    };
  }

  entry.count += 1;
  const elapsedSeconds = Math.floor((now - entry.windowStart) / 1000);
  const resetSeconds = Math.max(1, config.windowSeconds - elapsedSeconds);

  return {
    allowed: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    resetSeconds,
    retryAfterSeconds: 0,
  };
}

/**
 * Generates standard rate limiting headers
 */
export function getRateLimitHeaders(result: RateLimitResult): HeadersInit {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": Math.max(0, result.remaining).toString(),
    "X-RateLimit-Reset": result.resetSeconds.toString(),
  };

  if (!result.allowed) {
    headers["Retry-After"] = result.retryAfterSeconds.toString();
  }

  return headers;
}
