import bcrypt from "bcryptjs";

/**
 * Hashes a string value using bcrypt.
 *
 * @param value - The string value to hash.
 * @param saltRounds - An optional number of salt rounds to use for hashing. Defaults to 10.
 * @returns A promise that resolves to the hashed value.
 */
export async function hashValue(
  value: string,
  saltRounds = 10
): Promise<string> {
  return bcrypt.hash(value, saltRounds);
}

/**
 * Compares a plain text value with a hashed value using bcrypt.
 *
 * @param value - The plain text value to compare.
 * @param hashedValue - The hashed value to compare against.
 * @returns A promise that resolves to true if the values match, false otherwise.
 * @throws Error - If an error occurs during comparison.
 */
export async function compareWithHash(
  value: string,
  hashedValue: string
): Promise<boolean> {
  try {
    const result = await bcrypt.compare(value, hashedValue);
    return result;
  } catch {
    throw new Error("Error comparing values with bcrypt hash.");
  }
}
