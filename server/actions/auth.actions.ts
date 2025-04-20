"use server";

import { UserInvitationPayload, verifyJWT } from "@/lib/security/jwt";
import { StandardActionResponse } from "../response";
import { internal_sendInvitationEmail } from "./internals/auth/send-invitation-email";
import { decryptURLSafe } from "@/lib/security/encryption";
import { internal_isTokenBlacklisted } from "./internals/auth/is-token-blacklisted";
import { internal_blacklistToken } from "./internals/auth/blacklist-token";
import { internal_verifyToken } from "./internals/auth/verify-token";

export async function sendInvitationEmail(params: {
  fullName: string;
  email: string;
}): Promise<StandardActionResponse> {
  return internal_sendInvitationEmail(params);
}

export async function isTokenBlacklisted(token: string): Promise<boolean> {
  return internal_isTokenBlacklisted(token);
}

export async function blacklistToken(
  token: string
): Promise<StandardActionResponse> {
  return internal_blacklistToken(token);
}

export async function verifyToken<T extends UserInvitationPayload>(
  token: string
): Promise<T | null> {
  return internal_verifyToken(token);
}

export async function signUp() {}

export async function signIn() {}

export async function signOut() {}

export async function sendPasswordResetEmail() {}

export async function resetPassword() {}

export async function banUser() {}

export async function unbanUser() {}

export async function updateRole() {}

export async function sendOTPEmail() {}

export async function verifyOTP() {}

export async function authorize() {}
