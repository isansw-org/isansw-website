"use server";

import { IUser, IUserInsertParams } from "@/database/schema/User";
import { internal_getUserByEmail } from "./internals/user/get-user-by-email";
import { StandardActionResponse } from "../response";
import { internal_createUser } from "./internals/user/create-user";

export async function getUserByEmail(email: string): Promise<IUser | null> {
  return await internal_getUserByEmail(email);
}

export async function createUser(
  params: IUserInsertParams
): Promise<StandardActionResponse> {
  return await internal_createUser(params);
}
