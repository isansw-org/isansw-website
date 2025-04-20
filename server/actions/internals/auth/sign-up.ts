import { hashValue } from "@/lib/security/hashing";
import { createUser } from "../../user.actions";
import {
  defaultErrorResponseHandler,
  SuccessResponse,
} from "@/server/response";
import { getModulePath } from "@/lib/utils/path";
import { logger } from "@/lib/utils/logger";
import { blacklistToken, verifyToken } from "../../auth.actions";

const module = getModulePath(import.meta.url);

export async function internal_signUp(params: {
  user: {
    fullName: string;
    email: string;
    password: string;
  };
  token: string;
}) {
  const log = logger.child({
    module,
    function: "internal_signUp",
    invoked_by: "NONEYET",
  });

  try {
    const { fullName, email, password } = params.user;
    const payload = await verifyToken(params.token);
    if (!payload) {
      throw new Error("Invalid or expired token.");
    }

    log.debug(`Hashing password for new user ${fullName} (${email})`);
    const passwordHash = await hashValue(password);

    log.debug(`Inserting new user ${fullName} (${email}) into the database...`);
    const response = await createUser({
      FullName: fullName,
      Email: email,
      PasswordHash: passwordHash,
      Role: "User",
    });
    if (!response.success) {
      throw new Error(response.message);
    }

    const _response = await blacklistToken(params.token);
    if (!_response.success) {
      throw new Error(_response.message);
    }

    return SuccessResponse("We have successfully created your account.");
  } catch (error) {
    return defaultErrorResponseHandler({ error: error, logger: log });
  }
}
