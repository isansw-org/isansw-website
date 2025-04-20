import database from "@/database/client";
import { IUser, User } from "@/database/schema/User";
import { logger } from "@/lib/utils/logger";
import { getModulePath } from "@/lib/utils/path";
import { eq } from "drizzle-orm";

const module = getModulePath(import.meta.url);

export async function internal_getUserById(id: number): Promise<IUser | null> {
  const log = logger.child({ module, function: "internal_getUserById" });

  try {
    log.debug(`Getting user by id: ${id}`);

    const [user] = await database.select().from(User).where(eq(User.Id, id));

    if (!user) {
      throw new Error(`User ${id} not found.`);
    }

    log.debug(`Found user with id: ${id}`);

    return user;
  } catch {
    log.debug(`User ${id} not found.`);
    return null;
  }
}
