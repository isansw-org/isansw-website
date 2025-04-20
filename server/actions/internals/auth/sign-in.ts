import { compareWithHash } from "@/lib/security/hashing";
import { getUserByEmail } from "../../user.actions";
import { signIn as NextAuthSignIn } from "@/lib/security/auth";
import {
  defaultErrorResponseHandler,
  ErrorResponse,
  GenericUnexpectedErrorResponse,
  SuccessResponse,
} from "@/server/response";
import { AuthError } from "next-auth";
import { getModulePath } from "@/lib/utils/path";
import { logger } from "@/lib/utils/logger";

const module = getModulePath(import.meta.url);

async function __verifyCredentials(params: {
  email: string;
  password: string;
}) {
  const user = await getUserByEmail(params.email);
  if (!user) {
    throw new Error("Invalid credentials.");
  }

  if (user.IsAccountDisabled) {
    throw new Error("This account has been disabled.");
  }

  const isPasswordMatching = await compareWithHash(
    params.password,
    user.PasswordHash
  );
  if (!isPasswordMatching) {
    throw new Error("Invalid credentials");
  }
}

export async function internal_signIn(params: {
  email: string;
  password: string;
}) {
  const log = logger.child({
    module,
    function: "internal_signIn",
    invoked_by: "NONEYET",
  });
  try {
    log.debug(`Verifying credentials for sign-in for user ${params.email}`);
    await __verifyCredentials(params);
    log.debug(
      `Provided credentials are valid for account ${params.email}. Proceeding...`
    );

    // handle 2fa

    log.debug(`Logging user in to account ${params.email}...`);
    await NextAuthSignIn("credentials", {
      email: params.email,
      password: params.password,
      redirect: false,
    });
    log.debug(`Successfully logged user into account ${params.email}`);

    return SuccessResponse("We have successfully signed you in.");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return ErrorResponse("Invalid credentials.");
        default:
          return GenericUnexpectedErrorResponse;
      }
    }

    return defaultErrorResponseHandler({ error: error, logger: log });
  }
}
