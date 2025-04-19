/**
 * Narrowing guard for string values
 */
export function isString(v: unknown): v is string {
  return typeof v === "string";
}

/**
 * Narrowing guard for number values
 */
export function isNumber(v: unknown): v is number {
  return typeof v === "number" && !Number.isNaN(v);
}

/**
 * Narrowing guard for integer values
 */
export function isInteger(v: unknown): v is number {
  return isNumber(v) && Number.isInteger(v);
}

/**
 * Narrowing guard for boolean values
 */
export function isBoolean(v: unknown): v is boolean {
  return typeof v === "boolean";
}

/**
 * Narrowing guard for Date instances
 */
export function isDate(v: unknown): v is Date {
  return v instanceof Date && !isNaN(v.getTime());
}

/**
 * Narrowing guard for arrays of a given type
 */
export function isArrayOf<T>(
  arr: unknown,
  guard: (item: unknown) => item is T
): arr is T[] {
  return Array.isArray(arr) && arr.every(guard);
}

/**
 * Narrowing guard for plain objects with values of a given type
 */
export function isRecord<K extends string, T>(
  obj: unknown,
  guard: (item: unknown) => item is T
): obj is Record<K, T> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    !Array.isArray(obj) &&
    Object.values(obj).every(guard)
  );
}
