import { decryptURLSafe } from "@/lib/security/encryption";
import { UserInvitationPayload, verifyJWT } from "@/lib/security/jwt";
import { isTokenBlacklisted } from "../../auth.actions";
import { logger } from "@/lib/utils/logger";
import { getModulePath } from "@/lib/utils/path";

const module = getModulePath(import.meta.url);

function __verifyAndExtractPayload<T extends UserInvitationPayload>(
  token: string
): T {
  const jwt = decryptURLSafe(token);
  const payload = verifyJWT<T>(jwt);
  if (!payload) {
    throw new Error("Invalid token.");
  }

  return payload;
}

export async function internal_verifyToken<T extends UserInvitationPayload>(
  token: string
): Promise<T | null> {
  const log = logger.child({
    module,
    function: "internal_verifyToken",
    invoked_by: "NONEYET",
  });

  try {
    log.debug(`Verifying token: ${token}`);

    const tokenBlacklisted = await isTokenBlacklisted(token);
    if (tokenBlacklisted) {
      log.error(
        `${token} is a blacklisted token. Cancelling token verification...`
      );
      throw new Error("Token is a blacklisted token.");
    }
    log.debug(`Verifying token ${token} and extracting its payload...`);

    return __verifyAndExtractPayload<T>(token);
  } catch {
    return null;
  }
}
