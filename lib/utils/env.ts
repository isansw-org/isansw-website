/*
Type-safe environment variables
*/

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  server: {
    APP_ORIGIN: z.string().url(),
    DATABASE_URL: z.string().url(),
  },
  runtimeEnv: {
    APP_ORIGIN: process.env.APP_ORIGIN,
    DATABASE_URL: process.env.DATABASE_URL,
  },
});

export default env;
