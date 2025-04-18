"use server";

import { IUser } from "@/database/schema/User";
import { internal_getUserByEmail } from "./internals/user/get-user-by-email";

export async function getUserByEmail(params: {
  email: string;
}): Promise<IUser | null> {
  return internal_getUserByEmail(params);
}
