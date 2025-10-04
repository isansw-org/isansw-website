ALTER TABLE "Event" DROP CONSTRAINT "Event_Details_unique";--> statement-breakpoint
DROP INDEX "Event_Details_Idx";--> statement-breakpoint
ALTER TABLE "Event" ADD COLUMN "Slug" varchar(255) NOT NULL;--> statement-breakpoint
CREATE INDEX "Event_Slug_Idx" ON "Event" USING btree ("Slug");--> statement-breakpoint
ALTER TABLE "Event" DROP COLUMN "Details";--> statement-breakpoint
ALTER TABLE "Event" ADD CONSTRAINT "Event_Slug_unique" UNIQUE("Slug");