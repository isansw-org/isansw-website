import env from "@/lib/utils/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(env.DATABASE_URL);

const database = drizzle({ client: queryClient });

export default database;
