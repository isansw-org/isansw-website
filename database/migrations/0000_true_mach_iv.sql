CREATE TYPE "public"."Role" AS ENUM('User', 'Admin', 'Superuser');--> statement-breakpoint
CREATE TABLE "User" (
	"Id" serial PRIMARY KEY NOT NULL,
	"FullName" varchar(255) NOT NULL,
	"Email" varchar(255) NOT NULL,
	"PasswordHash" varchar(255) NOT NULL,
	"Role" "Role" NOT NULL,
	"TwoFactorEnabled" boolean DEFAULT false NOT NULL,
	"IsBanned" boolean DEFAULT false NOT NULL,
	"LastLogin" timestamp,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "User_FullName_unique" UNIQUE("FullName"),
	CONSTRAINT "User_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
CREATE INDEX "User_Email_Idx" ON "User" USING btree ("Email");