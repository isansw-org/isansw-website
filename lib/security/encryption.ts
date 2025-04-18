import { AES, enc } from "crypto-js";
import env from "../utils/env";

/**
 * Encrypts a given text using AES encryption with a secret key and initialization vector (IV).
 *
 * @param {string} text - The plaintext to be encrypted.
 * @returns {string} - The encrypted ciphertext in Base64 format.
 */
export function encrypt(text: string): string {
  const iv = enc.Utf8.parse(env.ENCRYPTION_IV);
  const cipherText = AES.encrypt(text, env.ENCRYPTION_SECRET, {
    iv,
  }).toString();

  return cipherText;
}

/**
 * Decrypts a given ciphertext back into the original plaintext using AES decryption.
 *
 * @param {string} cipherText - The encrypted text (Base64 format) to be decrypted.
 * @returns {string} - The decrypted plaintext.
 */
export function decrypt(cipherText: string): string {
  const iv = enc.Utf8.parse(env.ENCRYPTION_IV);
  const text = AES.decrypt(cipherText, env.ENCRYPTION_SECRET, { iv }).toString(
    enc.Utf8
  );

  return text;
}

/**
 * Encrypts the provided text and converts the ciphertext into a URL-safe format.
 * The transformation replaces characters that are not safe for URLs: '+' becomes '-', '/' becomes '_',
 * and trailing padding '=' is removed.
 *
 * @param {string} text - The plaintext to be encrypted and converted to URL-safe format.
 * @returns {string} - The encrypted text in URL-safe format.
 */
export function encryptURLSafe(text: string): string {
  const cipherText = encrypt(text);

  // Convert to URL-safe format by replacing '+' with '-', '/' with '_', and removing '=' padding
  const urlSafeCipherText = cipherText
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, ""); // Remove trailing '='

  return urlSafeCipherText;
}

/**
 * Decrypts a URL-safe ciphertext back into the original plaintext.
 * This function first reverses the URL-safe transformations (replaces '-' with '+',
 * '_' with '/', and adds back padding if necessary), then decrypts the text.
 *
 * @param {string} urlSafeCipherText - The URL-safe encrypted text to be decrypted.
 * @returns {string} - The decrypted plaintext.
 */
export function decryptURLSafe(urlSafeCipherText: string): string {
  // Reverse the URL-safe transformations by replacing '-' with '+', '_' with '/', and adding padding
  const cipherText = urlSafeCipherText
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(urlSafeCipherText.length + (urlSafeCipherText.length % 4), "="); // Add padding if necessary

  return decrypt(cipherText);
}
