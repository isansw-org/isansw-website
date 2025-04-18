import jwt from "jsonwebtoken";
import env from "../utils/env";

const jwtDefaults = {
  issuer: "ISANSW",
  audience: "ISANSW",
};

export type UserInvitationPayload = {
  fullName: string;
  email: string;
};

export type TokenOptions = {
  subject: string;

  /** Expiration time for the token. */
  // 1 day for user invitation
  expiresIn: "1d";
};

/**
 * Signs a JWT with the given payload and options.
 *
 * @param payload - The data to be encoded in the JWT.
 * @param options - Options for the JWT, including subject and expiration time.
 * @returns The signed JWT.
 */
export function signJWT(
  payload: UserInvitationPayload,
  options: TokenOptions
): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    issuer: jwtDefaults.issuer,
    audience: jwtDefaults.audience,
    expiresIn: options.expiresIn,
    subject: options.subject,
  });
}

/**
 * Verifies a JWT and decodes the payload.
 *
 * @param token - The JWT to be verified.
 * @returns The decoded payload if the token is valid, otherwise null.
 */
export function verifyJWT<TokenPayload extends UserInvitationPayload>(
  token: string
): TokenPayload | null {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET, {
      issuer: jwtDefaults.issuer,
      audience: jwtDefaults.audience,
    }) as TokenPayload;

    return payload;
  } catch {
    return null;
  }
}
