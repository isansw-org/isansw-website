// lib/utils/env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";

export const env = createEnv({
  // Only server-side vars here (never expose secrets to client)
  server: {
    APP_ORIGIN: z.string().url(), // required
    DATABASE_URL: z.string().url(), // required
    AUTH_SECRET: z.string().min(1), // required
    AUTH_TRUST_HOST: z.enum(["true", "false"]).default("true"), // make sane default
    JWT_SECRET: z.string().min(1), // required
    ENCRYPTION_SECRET: z.string().min(1), // required by your code?
    ENCRYPTION_IV: z.string().min(1), // required by your code?
    SMTP_HOST: z.string().min(1).optional(), // optional while email not used
    SMTP_PORT: z.coerce.number().optional(), // optional
    SMTP_USERNAME: z.string().min(1).optional(), // optional
    SMTP_PASSWORD: z.string().min(1).optional(), // optional
    EMAIL_SENDER_ADDRESS: z.string().min(1).optional(), // optional
    // You can also add NEXTAUTH_URL / NEXTAUTH_SECRET here if you want them validated:
    // NEXTAUTH_URL: z.string().url(),
    // NEXTAUTH_SECRET: z.string().min(1),
  },

  runtimeEnv: {
    APP_ORIGIN: process.env.APP_ORIGIN,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    JWT_SECRET: process.env.JWT_SECRET,
    ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,
    ENCRYPTION_IV: process.env.ENCRYPTION_IV,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    EMAIL_SENDER_ADDRESS: process.env.EMAIL_SENDER_ADDRESS,
    // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    // NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },

  skipValidation: !isProd,

  emptyStringAsUndefined: true,
});

export default env;
