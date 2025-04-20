"use server";

import { IUser, IUserInsertParams } from "@/database/schema/User";
import { internal_getUserByEmail } from "./internals/user/get-user-by-email";

export async function getUserByEmail(email: string): Promise<IUser | null> {
  return internal_getUserByEmail(email);
}

export async function createUser(params: IUserInsertParams) {}
