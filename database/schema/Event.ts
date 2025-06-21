import * as sql from "drizzle-orm/pg-core";
import { timestamps } from "../timestamps";

export const Event = sql.pgTable(
  "Event",
  {
    Id: sql.serial("Id").primaryKey(),
    Date: sql.date("Date").notNull(),
    ImageUrl: sql.varchar("ImageUrl", { length: 1024 }).notNull(),
    Title: sql.varchar("Title", { length: 255 }).notNull(),
    Subtitle: sql.varchar("Subtitle", { length: 255 }),
    Description: sql.text("Description"),
    Slug: sql.varchar("Slug", { length: 255 }).unique().notNull(),
    ...timestamps,
  },
  (table) => [sql.index("Event_Slug_Idx").on(table.Slug)]
);

export type IEvent = typeof Event.$inferSelect;
export type IEventInsertParams = typeof Event.$inferInsert;
