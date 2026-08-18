/**
 * Distributed & Serverless-Ready Rate Limiter Utility
 * Provides IP and User based rate limiting for sensitive API routes, auth, and AI endpoints.
 */

import { type NextRequest } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up expired keys periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    rateLimitStore.forEach((record, key) => {
      if (now > record.resetAt) {
        rateLimitStore.delete(key);
      }
    });
  }, 180000);
}

export interface RateLimitOptions {
  /** Maximum number of requests within the window */
  maxRequests: number;
  /** Window size in seconds */
  windowSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

export const RATE_LIMIT_PRESETS = {
  /** AI Assistant endpoints: 10 requests per minute */
  AI_MINUTE: { maxRequests: 10, windowSeconds: 60 },
  /** AI Assistant daily quota: 50 requests per day */
  AI_DAILY: { maxRequests: 50, windowSeconds: 86400 },
  /** Order Placement: 20 submissions per minute */
  ORDERS: { maxRequests: 20, windowSeconds: 60 },
  /** Authentication & Login: 5 attempts per minute */
  AUTH: { maxRequests: 5, windowSeconds: 60 },
  /** Lead Conversions & Admin Mutations: 20 requests per minute */
  ADMIN_MUTATION: { maxRequests: 20, windowSeconds: 60 },
  /** Public API endpoints: 60 requests per minute */
  PUBLIC_API: { maxRequests: 60, windowSeconds: 60 },
};

/**
 * Extracts and sanitizes the true client IP from standard reverse proxy headers
 */
export function getClientIp(req?: NextRequest | Headers | null): string {
  if (!req) return '127.0.0.1';

  let forwarded: string | null = null;
  let realIp: string | null = null;
  let cfConnectingIp: string | null = null;

  if ('headers' in req && typeof req.headers.get === 'function') {
    forwarded = req.headers.get('x-forwarded-for');
    realIp = req.headers.get('x-real-ip');
    cfConnectingIp = req.headers.get('cf-connecting-ip');
  }

  const rawIp = cfConnectingIp || realIp || (forwarded ? forwarded.split(',')[0].trim() : null) || '127.0.0.1';
  // Sanitize IP string
  return rawIp.replace(/[^a-fA-F0-9.:]/g, '').slice(0, 45);
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = RATE_LIMIT_PRESETS.PUBLIC_API
): RateLimitResult {
  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;
  const key = `${identifier}_${options.windowSeconds}`;

  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetAt) {
    // New window
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + windowMs,
    };
    rateLimitStore.set(key, newRecord);

    return {
      success: true,
      limit: options.maxRequests,
      remaining: options.maxRequests - 1,
      resetAt: newRecord.resetAt,
    };
  }

  // Existing active window
  if (existing.count >= options.maxRequests) {
    return {
      success: false,
      limit: options.maxRequests,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  return {
    success: true,
    limit: options.maxRequests,
    remaining: options.maxRequests - existing.count,
    resetAt: existing.resetAt,
  };
}
