"use server";

import { IUser, IUserInsertParams } from "@/database/schema/User";
import { internal_getUserByEmail } from "./internals/user/get-user-by-email";
import { StandardActionResponse } from "../response";
import { internal_createUser } from "./internals/user/create-user";
import { internal_getUserById } from "./internals/user/get-user-by-id";

export async function getUserById(id: number): Promise<IUser | null> {
  return await internal_getUserById(id);
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
  return await internal_getUserByEmail(email);
}

export async function createUser(
  params: IUserInsertParams
): Promise<StandardActionResponse> {
  return await internal_createUser(params);
}
