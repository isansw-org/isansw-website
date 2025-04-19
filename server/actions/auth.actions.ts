"use server";

import { StandardActionResponse } from "../response";
import { internal_sendInvitationEmail } from "./internals/auth/send-invitation-email";

export async function sendInvitationEmail(params: {
  fullName: string;
  email: string;
}): Promise<StandardActionResponse> {
  return internal_sendInvitationEmail(params);
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
