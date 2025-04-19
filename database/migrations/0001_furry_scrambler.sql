CREATE TABLE "BlacklistedToken" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Token" varchar(2048) NOT NULL,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "BlacklistedToken_Token_unique" UNIQUE("Token")
);
--> statement-breakpoint
ALTER TABLE "User" RENAME COLUMN "IsBanned" TO "IsAccountDisabled";--> statement-breakpoint
CREATE INDEX "BlacklistedToken_Token_Idx" ON "BlacklistedToken" USING btree ("Token");