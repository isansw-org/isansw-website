// lib/email/mailer.ts
import { getEmailTemplate, EmailTemplates } from "./templating";

type NodemailerTransportParams = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export const getSmtpConfig = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USERNAME ?? process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD ?? process.env.SMTP_PASS;

  if (process.env.NODE_ENV === "production") {
    if (!host || !user || !pass) throw new Error("Missing SMTP config");
  }
  return {
    host: host ?? "localhost",
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  };
};

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
  const html = await getEmailTemplate(template, context);
  const from =
    process.env.EMAIL_SENDER_ADDRESS ??
    (process.env.NODE_ENV === "production"
      ? (() => {
          throw new Error("EMAIL_SENDER_ADDRESS not set");
        })()
      : "ISANSW <no-reply@isansw.org>");
  return { from, to, subject, html };
};

export const sendEmail = async (email: NodemailerTransportParams) => {
  const origin =
    process.env.APP_ORIGIN ??
    (process.env.NODE_ENV === "production"
      ? (() => {
          throw new Error("APP_ORIGIN not set");
        })()
      : "http://localhost:3000");
  const res = await fetch(`${origin}/api/emails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });
  const payload: { success: boolean; message: string } = await res.json();
  return { requestMade: res.ok, responsePayload: payload };
};
