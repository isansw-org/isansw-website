/*
A localstorage simulation of a ratelimiting mechanism.

Proper IP-based ratelimit is not obviously easy because
the production infrastructure is serverless by nature (Vercel)
so we would need an intermediary storage such as Redis
to store ratelimit states
*/

import { timeToReadableFormat } from "../utils/datetime";

export type RateLimitActionOptions = "SignUp" | "SignIn" | "InviteUser";

type RateLimitData = {
  count: number;
  time: number;
};

const rateLimitConfig: Record<
  RateLimitActionOptions,
  { maxTries: number; limit: number }
> = {
  SignUp: { maxTries: 10, limit: 60000 },
  SignIn: { maxTries: 5, limit: 60000 },
  InviteUser: { maxTries: 5, limit: 15000 },
};

// Fallback default configuration if a key is not defined.
const DEFAULT_CONFIG = { maxTries: 3, limit: 60000 };

/**
 * Checks whether an action for the given key is allowed based on the configured rate limit.
 * Uses localStorage to persist the try count and timestamp.
 *
 * @param key Unique identifier for the action.
 * @returns true if the action is allowed (and increments the try count),
 *          false if the rate limit has been exceeded.
 */
export function rateLimit(key: RateLimitActionOptions): boolean {
  if (typeof window === "undefined" || !window.localStorage) {
    return true;
  }

  const config = rateLimitConfig[key] || DEFAULT_CONFIG;
  const storageKey = `rateLimit-${key}`;
  const now = Date.now();

  const storedData = window.localStorage.getItem(storageKey);
  let data: RateLimitData | null = null;

  try {
    if (storedData) {
      data = JSON.parse(storedData);
    }
  } catch (error) {
    data = null;
  }

  // If no previous data or the time period has passed,
  // reset the counter.
  if (!data || now - data.time >= config.limit) {
    const newData: RateLimitData = { count: 1, time: now };
    window.localStorage.setItem(storageKey, JSON.stringify(newData));
    return true;
  }

  // If the number of tries is under the maximum allowed,
  // increment and allow the action.
  if (data.count < config.maxTries) {
    const newData: RateLimitData = { count: data.count + 1, time: data.time };
    window.localStorage.setItem(storageKey, JSON.stringify(newData));
    return true;
  }

  // Limit exceeded
  return false;
}

export function rateLimitExceeded(key: RateLimitActionOptions): boolean {
  return !rateLimit(key);
}

/**
 * Returns the amount of time (in milliseconds) left until the action is allowed again.
 *
 * If there is no active rate limit (or if the period has expired), 0 is returned.
 *
 * @param key Unique identifier for the action.
 * @returns The time left (in ms) until the action becomes available, or 0 if no rate limiting applies.
 */
export function rateLimit_timeLeft(key: RateLimitActionOptions): number {
  if (typeof window === "undefined" || !window.localStorage) {
    return 0;
  }

  const config = rateLimitConfig[key] || DEFAULT_CONFIG;
  const storageKey = `rateLimit-${key}`;
  const storedData = window.localStorage.getItem(storageKey);
  let data: RateLimitData | null = null;
  const now = Date.now();

  try {
    if (storedData) {
      data = JSON.parse(storedData);
    }
  } catch (error) {
    data = null;
  }

  if (!data || now - data.time >= config.limit) {
    // No active rate-limit
    return 0;
  }

  return config.limit - (now - data.time);
}

export function rateLimit_defaultErrorMessage(
  key: RateLimitActionOptions
): string {
  const timeLeft = timeToReadableFormat(rateLimit_timeLeft(key));
  return `Too many attempts. Please try again in ${timeLeft}`;
}
