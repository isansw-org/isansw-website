import env from "../utils/env";
import { getEmailTemplate, EmailTemplates } from "./templating";

type NodemailerTransportParams = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

/**
 * Gets the SMTP configuration for the email transporter.
 *
 * @returns An object containing the SMTP configuration.
 */
export const getSmtpConfig = () => ({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
});

/**
 * Creates an email object for sending.
 *
 * @param params - An object containing the email parameters.
 *   - `to` - The recipient's email address.
 *   - `subject` - The email subject.
 *   - `template` - The name of the email template to use.
 *   - `context` - An object containing data to be used to render the email template.
 * @returns An object representing the email to be sent, containing `from`, `to`, `subject`, and `html`.
 */
export const createEmail = async ({
  to,
  subject,
  template,
  context,
}: {
  to: string;
  subject: string;
  template: EmailTemplates;
  context: Record<string, string>;
}): Promise<NodemailerTransportParams> => {
  const emailHtml = await getEmailTemplate(template, context);

  return {
    from: env.EMAIL_SENDER_ADDRESS,
    to: to,
    subject: subject,
    html: emailHtml,
  };
};

export const sendEmail = async (email: NodemailerTransportParams) => {
  const response = await fetch(`${env.APP_ORIGIN}/api/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });

  const responsePayload: { success: boolean; message: string } =
    await response.json();

  return {
    requestMade: response.ok,
    responsePayload: responsePayload,
  };
};
