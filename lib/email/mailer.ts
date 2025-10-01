// lib/email/mailer.ts
import { getEmailTemplate, EmailTemplates } from "./templating";

type NodemailerTransportParams = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

/**
 * Build SMTP config from process.env.
 * - In PROD: require host/user/pass (throw if missing)
 * - In DEV/Preview: fall back to harmless defaults
 */
export const getSmtpConfig = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USERNAME ?? process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD ?? process.env.SMTP_PASS;

  if (process.env.NODE_ENV === "production") {
    if (!host || !user || !pass) {
      throw new Error(
        "Missing SMTP config (SMTP_HOST/SMTP_USERNAME/SMTP_PASSWORD)."
      );
    }
  }

  return {
    host: host ?? "localhost",
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  };
};

/**
 * Create the email payload using a template.
 * Ensures "from" is always a string (fallback in dev/preview).
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

  const from =
    process.env.EMAIL_SENDER_ADDRESS ??
    (process.env.NODE_ENV === "production"
      ? (() => {
          throw new Error(
            "EMAIL_SENDER_ADDRESS is not set (required in production)."
          );
        })()
      : "ISANSW <no-reply@isansw.org>");

  return { from, to, subject, html: emailHtml };
};

/**
 * Call your emails API route to send the email.
 * Uses APP_ORIGIN only at runtime.
 */
export const sendEmail = async (email: NodemailerTransportParams) => {
  const origin =
    process.env.APP_ORIGIN ??
    (process.env.NODE_ENV === "production"
      ? (() => {
          throw new Error("APP_ORIGIN is not set (required in production).");
        })()
      : "http://localhost:3000");

  const response = await fetch(`${origin}/api/emails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });

  const responsePayload: { success: boolean; message: string } =
    await response.json();

  return { requestMade: response.ok, responsePayload };
};
