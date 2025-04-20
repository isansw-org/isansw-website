import { IUserInsertParams, User } from "@/database/schema/User";
import { logger } from "@/lib/utils/logger";
import { getModulePath } from "@/lib/utils/path";
import {
  defaultErrorResponseHandler,
  StandardActionResponse,
  SuccessResponse,
} from "@/server/response";
import { getUserByEmail } from "../../user.actions";
import database from "@/database/client";

const module = getModulePath(import.meta.url);

export async function internal_createUser(
  params: IUserInsertParams
): Promise<StandardActionResponse> {
  const log = logger.child({
    module,
    function: "internal_createUser",
    invoked_by: "NONEYET",
  });
  try {
    log.debug(
      `Checking if ${params.FullName} (${params.Email}) already exists...`
    );
    const existingUser = await getUserByEmail(params.Email);
    if (existingUser) {
      throw new Error(
        `${params.FullName} (${params.Email}) is already a registered user.`
      );
    }

    log.debug(
      `Inserting new user ${params.FullName} (${params.Email}) into the database...`
    );
    const [user] = await database.insert(User).values(params).returning();
    if (!user) {
      throw new Error(
        `Failed to create new user ${params.FullName} (${params.Email})`
      );
    }

    return SuccessResponse("Account has successfully been created.");
  } catch (error) {
    return defaultErrorResponseHandler({ error: error, logger: log });
  }
}
