import env from "./lib/utils/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./database/schema",
  out: "./database/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
