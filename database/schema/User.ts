import * as sql from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";
import { roleOptions } from "@/lib/constants/roles";

export const roleEnum = sql.pgEnum("Role", roleOptions);

export const User = sql.pgTable(
  "User",
  {
    Id: sql.serial("Id").primaryKey(),
    FullName: sql.varchar("FullName", { length: 255 }).unique().notNull(),
    Email: sql.varchar("Email", { length: 255 }).unique().notNull(),
    PasswordHash: sql.varchar("PasswordHash", { length: 255 }).notNull(),
    Role: roleEnum().notNull(),
    TwoFactorEnabled: sql.boolean("TwoFactorEnabled").notNull().default(false),
    IsAccountDisabled: sql
      .boolean("IsAccountDisabled")
      .notNull()
      .default(false),
    LastLogin: sql.timestamp("LastLogin"), // if null, then user was just registered and hasn't logged in
    ...timestamps,
  },
  // Optimization: Unclustered index for faster query by email
  (table) => [sql.index("User_Email_Idx").on(table.Email)]
);

export type IUser = typeof User.$inferSelect;
export type IUserInsertParams = typeof User.$inferInsert;
