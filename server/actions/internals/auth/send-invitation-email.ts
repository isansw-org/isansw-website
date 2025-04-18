import {
  signJWT,
  TokenOptions,
  UserInvitationPayload,
} from "@/lib/security/jwt";
import {
  defaultErrorResponseHandler,
  StandardActionResponse,
} from "../../../response";
import { getUserByEmail } from "../../user.actions";
import { encryptURLSafe } from "@/lib/security/encryption";
import env from "@/lib/utils/env";

async function __verifyUserNonExistence(email: string): Promise<void> {
  try {
    const existingUser = await getUserByEmail({ email: email });
    if (!existingUser) {
      throw new Error(`${email} is an existing, registered user.`);
    }
  } catch (error) {
    throw error;
  }
}

function __createToken(payload: UserInvitationPayload): string {
  const jwtOptions: TokenOptions = {
    subject: payload.email,
    expiresIn: "1d",
  };

  const { fullName, email } = payload;

  const token = signJWT({ fullName, email }, jwtOptions);

  const encryptedToken = encryptURLSafe(token);

  return encryptedToken;
}

function __createRegistrationUrl(tokenPayload: UserInvitationPayload): string {
  const token = __createToken(tokenPayload);
  return `${env.APP_ORIGIN}/sign-up?token=${token}`;
}

export async function internal_sendInvitationEmail(
  payload: UserInvitationPayload
): Promise<StandardActionResponse> {
  try {
    __verifyUserNonExistence(payload.email);

    const registrationUrl = __createRegistrationUrl(payload);
    // TODO: generate registration url
    // TODO: create email
    // TODO: send email
  } catch (error) {
    return defaultErrorResponseHandler(error);
  }
}
