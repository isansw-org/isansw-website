import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL, {
  max: 1,
  onnotice: () => {}, // This will try to hide weird Drizzle warnings
});

const database = drizzle({ client: queryClient });

export default database;
