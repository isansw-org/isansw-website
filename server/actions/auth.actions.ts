"use server";

import { UserInvitationPayload } from "@/lib/security/jwt";
import { StandardActionResponse } from "../response";
import { internal_sendInvitationEmail } from "./internals/auth/send-invitation-email";
import { internal_isTokenBlacklisted } from "./internals/auth/is-token-blacklisted";
import { internal_blacklistToken } from "./internals/auth/blacklist-token";
import { internal_verifyToken } from "./internals/auth/verify-token";
import { internal_signUp } from "./internals/auth/sign-up";
import { getUserByEmail } from "./user.actions";
import { internal_signIn } from "./internals/auth/sign-in";

export async function sendInvitationEmail(params: {
  fullName: string;
  email: string;
}): Promise<StandardActionResponse> {
  return await internal_sendInvitationEmail(params);
}

export async function isTokenBlacklisted(token: string): Promise<boolean> {
  return await internal_isTokenBlacklisted(token);
}

export async function blacklistToken(
  token: string
): Promise<StandardActionResponse> {
  return await internal_blacklistToken(token);
}

export async function verifyToken<T extends UserInvitationPayload>(
  token: string
): Promise<T | null> {
  return await internal_verifyToken(token);
}

export async function signUp(params: {
  user: {
    fullName: string;
    email: string;
    password: string;
  };
  token: string;
}) {
  return await internal_signUp(params);
}

export async function signIn(params: {
  email: string;
  password: string;
}): Promise<StandardActionResponse> {
  return await internal_signIn(params);
}

export async function signOut() {}

export async function sendPasswordResetEmail() {}

export async function resetPassword() {}

export async function banUser() {}

export async function unbanUser() {}

export async function updateRole() {}

export async function sendOTPEmail() {}

export async function verifyOTP() {}

export async function authorize() {}
