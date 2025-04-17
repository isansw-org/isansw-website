import * as sql from "drizzle-orm/pg-core";

/**
 * An object containing timestamp fields for database records.
 *
 * @property {sql.Timestamp} updatedAt - The timestamp for when the record was last updated.
 * This field is set to the current timestamp by default and cannot be null.
 *
 * @property {sql.Timestamp} createdAt - The timestamp for when the record was created.
 * This field is set to the current timestamp by default and cannot be null.
 */
export const timestamps = {
  UpdatedAt: sql.timestamp("UpdatedAt").defaultNow().notNull(),
  CreatedAt: sql.timestamp("CreatedAt").defaultNow().notNull(),
};
