import database from "@/database/client";
import { BlacklistedToken } from "@/database/schema/BlacklistedToken";
import { logger } from "@/lib/utils/logger";
import { getModulePath } from "@/lib/utils/path";
import { eq } from "drizzle-orm";

const module = getModulePath(import.meta.url);

export async function internal_isTokenBlacklisted(
  token: string
): Promise<boolean> {
  const log = logger.child({
    module,
    function: "internal_isTokenBlacklisted",
    invoked_by: "NONEYET",
  });

  try {
    log.debug(`Checking if ${token} is a blacklisted token.`);

    const [blacklistedToken] = await database
      .select()
      .from(BlacklistedToken)
      .where(eq(BlacklistedToken.Token, token));

    if (blacklistedToken) {
      const errorMessage = `Token ${token} has previously been used and is now blacklisted.`;
      log.error(errorMessage);
      throw new Error(errorMessage);
    }

    log.debug(`Confirmed that ${token} is not a blacklisted token.`);

    return false;
  } catch (error) {
    return true;
  }
}
