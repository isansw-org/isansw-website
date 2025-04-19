import database from "@/database/client";
import { IUser, User } from "@/database/schema/User";
import { logger } from "@/lib/utils/logger";
import { getModulePath } from "@/lib/utils/path";
import { eq } from "drizzle-orm";

const module = getModulePath(import.meta.url);

export async function internal_getUserByEmail(params: {
  email: string;
}): Promise<IUser | null> {
  const log = logger.child({ module, function: "internal_getUserByEmail" });

  try {
    log.debug(`Getting user by email: ${params.email}`);

    const [user] = await database
      .select()
      .from(User)
      .where(eq(User.Email, params.email));

    if (!user) {
      throw new Error(`User ${params.email} not found.`);
    }

    log.debug(`Found user with email: ${params.email}`);

    return user;
  } catch {
    log.debug(`User ${params.email} not found.`);
    return null;
  }
}
