CREATE TABLE "Event" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Date" date NOT NULL,
	"ImageUrl" varchar(1024) NOT NULL,
	"Title" varchar(255) NOT NULL,
	"Subtitle" varchar(255),
	"Description" text,
	"Details" varchar(255) NOT NULL,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Event_Details_unique" UNIQUE("Details")
);
--> statement-breakpoint
CREATE INDEX "Event_Details_Idx" ON "Event" USING btree ("Details");