import * as sql from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";

export const BlacklistedToken = sql.pgTable(
  "BlacklistedToken",
  {
    Id: sql.serial("Id").primaryKey(),
    Token: sql.varchar("Token", { length: 2048 }).unique().notNull(),
    ...timestamps,
  },
  (table) => [sql.index("BlacklistedToken_Token_Idx").on(table.Token)]
);

export type IBlacklistedToken = typeof BlacklistedToken.$inferSelect;
export type IBlacklistedTokenInsertParams =
  typeof BlacklistedToken.$inferInsert;
