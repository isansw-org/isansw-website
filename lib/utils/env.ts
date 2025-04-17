/*
Type-safe environment variables
*/

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  server: {
    APP_ORIGIN: z.string().url(),
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    AUTH_TRUST_HOST: z.string(),
    JWT_SECRET: z.string(),
    ENCRYPTION_SECRET: z.string(),
    ENCRYPTION_IV: z.string(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number(),
    SMTP_USERNAME: z.string(),
    SMTP_PASSWORD: z.string(),
    EMAIL_SENDER_ADDRESS: z.string(),
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
  },
});

export default env;
