import database from "@/database/client";
import { User } from "@/database/schema/User";
import { hashValue } from "@/lib/security/hashing";
import { eq } from "drizzle-orm";

const FULL_NAME = "John Doe";
const EMAIL = "john.doe@example.com";
const PASSWORD = "Password@123";

const passwordHash = await hashValue(PASSWORD, 12);

const [existingUser] = await database
  .select()
  .from(User)
  .where(eq(User.Email, EMAIL));

if (existingUser) {
  console.error(`User ${EMAIL} already exists.\n`);
  process.exit(1);
}

const [user] = await database
  .insert(User)
  .values({
    FullName: FULL_NAME,
    Email: EMAIL,
    PasswordHash: passwordHash,
    Role: "Superuser",
  })
  .returning();

if (!user) {
  console.error("Failed to create initial user for development.\n");
  process.exit(1);
}

console.log(
  `Successfully created initial user with email "${EMAIL}" and password "${PASSWORD}"`
);

process.exit();
