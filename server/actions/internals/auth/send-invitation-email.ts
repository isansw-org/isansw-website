import {
  signJWT,
  TokenOptions,
  UserInvitationPayload,
} from "@/lib/security/jwt";
import {
  defaultErrorResponseHandler,
  StandardActionResponse,
  SuccessResponse,
} from "../../../response";
import { getUserByEmail } from "../../user.actions";
import { encryptURLSafe } from "@/lib/security/encryption";
import env from "@/lib/utils/env";
import { createEmail, sendEmail } from "@/lib/email/mailer";
import { EmailTemplates } from "@/lib/email/templating";
import { getModulePath } from "@/lib/utils/path";
import { logger } from "@/lib/utils/logger";

const module = getModulePath(import.meta.url);

const __verifyUserNonExistence = async (email: string): Promise<void> => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error(`Invitee ${email} is an existing, registered user.`);
    }
  } catch (error) {
    throw error;
  }
};

const __createToken = (payload: UserInvitationPayload): string => {
  const jwtOptions: TokenOptions = {
    subject: payload.email,
    expiresIn: "1d",
  };

  const { fullName, email } = payload;

  const token = signJWT({ fullName, email }, jwtOptions);

  const encryptedToken = encryptURLSafe(token);

  return encryptedToken;
};

const __createRegistrationUrl = (
  tokenPayload: UserInvitationPayload
): string => {
  const token = __createToken(tokenPayload);
  return `${env.APP_ORIGIN}/sign-up?token=${token}`;
};

const __sendInvitationEmail = async (params: {
  recipientEmail: string;
  recipientName: string;
  registrationLink: string;
}): Promise<void> => {
  try {
    const email = await createEmail({
      to: params.recipientEmail,
      subject:
        "You have been invited to be an operator for the ISANSW website.",
      template: EmailTemplates.InvitationEmailTemplate,
      context: {
        recipientName: params.recipientName,
        registrationLink: params.registrationLink,
      },
    });

    const { requestMade, responsePayload } = await sendEmail(email);

    if (!requestMade || !responsePayload.success) {
      throw new Error(
        responsePayload.message || "Failed to send invitation email."
      );
    }
  } catch (error) {
    throw error;
  }
};

export async function internal_sendInvitationEmail(
  payload: UserInvitationPayload
): Promise<StandardActionResponse> {
  const log = logger.child({
    module,
    function: "internal_sendInvitationEmail",
    invoked_by: "NONEYET",
  });

  try {
    await __verifyUserNonExistence(payload.email);
    log.debug(`No existing user ${payload.email} as expected. Proceed...`);

    const registrationUrl = __createRegistrationUrl(payload);
    await __sendInvitationEmail({
      recipientEmail: payload.email,
      recipientName: payload.fullName,
      registrationLink: registrationUrl,
    });
    log.debug(
      `Successfully sent email with registration link to invitee ${payload.email}`
    );

    return SuccessResponse(
      `An invitation email has been sent to ${payload.email}`
    );
  } catch (error) {
    return defaultErrorResponseHandler({ error: error, logger: log });
  }
}
