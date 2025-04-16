/*
A localstorage simulation of a ratelimiting mechanism.

Proper IP-based ratelimit is not obviously easy because
the production infrastructure is serverless by nature (Vercel)
so we would need an intermediary storage such as Redis
to store ratelimit states
*/

export type RateLimitActionOptions = "SignIn";

type RateLimitData = {
  count: number;
  time: number;
};

// Predefined configuration for known keys.
// Customize these values or add new keys as needed.
const rateLimitConfig: Record<string, { maxTries: number; limit: number }> = {
  myFormSubmit: { maxTries: 5, limit: 15000 }, // e.g. 3 tries per 1 minute
  // add more keys and their corresponding settings here
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

/**
 * Checks the rate limit for a given key and, if the action is rate limited,
 * executes the provided callback with an object containing `timeLeft` (in milliseconds)
 * until the action is allowed again.
 *
 * The client API simply calls onRateLimit(key, callback). If the action is allowed,
 * nothing happens. If not allowed, the callback is invoked.
 *
 * @param key Unique identifier for the action.
 * @param callback Function to execute when the rate limit has been reached.
 *                 Receives an object: { timeLeft: number }.
 */
export function onRateLimit(
  key: RateLimitActionOptions,
  callback: (state: { timeLeft: number }) => void
): void {
  if (typeof window === "undefined" || !window.localStorage) return;

  // If the rateLimit check allows the action, do nothing.
  const allowed = rateLimit(key);
  if (allowed) return;

  // Otherwise, get the configuration and calculate how much time remains.
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

  if (data && now - data.time < config.limit) {
    const timeLeft = config.limit - (now - data.time);

    callback({ timeLeft });
  }
}
