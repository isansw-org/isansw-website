import database from "@/database/client";
import { BlacklistedToken } from "@/database/schema/BlacklistedToken";
import { logger } from "@/lib/utils/logger";
import { getModulePath } from "@/lib/utils/path";
import {
  defaultErrorResponseHandler,
  StandardActionResponse,
  SuccessResponse,
} from "@/server/response";
import { eq } from "drizzle-orm";

const module = getModulePath(import.meta.url);

export async function internal_blacklistToken(
  token: string
): Promise<StandardActionResponse> {
  const log = logger.child({
    module,
    function: "internal_blacklistToken",
    invoked_by: "NONEYET",
  });

  try {
    log.debug(`Checking if ${token} is already blacklisted...`);
    const [foundMatchingToken] = await database
      .select()
      .from(BlacklistedToken)
      .where(eq(BlacklistedToken.Token, token));

    if (foundMatchingToken) {
      throw new Error(`Token ${token} is already blacklisted.`);
    }

    log.debug(`Token ${token} is not a blacklisted token. Proceeding...`);

    const [blacklistedToken] = await database
      .insert(BlacklistedToken)
      .values({ Token: token })
      .returning();
    if (!blacklistedToken) {
      throw new Error(`Failed to blacklist token ${token}`);
    }

    log.debug(`Successfully blacklisted token ${token}`);

    return SuccessResponse("Token has been successfully blacklisted");
  } catch (error) {
    return defaultErrorResponseHandler({ error: error, logger: log });
  }
}
