import database from "@/database/client";
import { IUser, User } from "@/database/schema/User";
import { eq } from "drizzle-orm";

export async function internal_getUserByEmail(params: {
  email: string;
}): Promise<IUser | null> {
  try {
    const [user] = await database
      .select()
      .from(User)
      .where(eq(User.Email, params.email));

    if (!user) {
      throw new Error(`User ${params.email} not found.`);
    }

    return user;
  } catch {
    return null;
  }
}
