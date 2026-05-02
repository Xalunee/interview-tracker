CREATE TYPE "public"."company_source" AS ENUM('hh', 'linkedin', 'referral', 'telegram', 'company_site', 'other');--> statement-breakpoint
CREATE TYPE "public"."salary_currency" AS ENUM('RUB', 'USD', 'EUR', 'KZT', 'AMD', 'GEL');--> statement-breakpoint
ALTER TABLE "companies" RENAME COLUMN "logo" TO "logo_url";--> statement-breakpoint
ALTER TABLE "companies" RENAME COLUMN "salary" TO "salary_min";--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "salary_min" TYPE integer USING NULL;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "status" "interview_stage" DEFAULT 'wishlist' NOT NULL;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "job_url" text;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "source" "company_source";--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "salary_max" integer;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "salary_currency" "salary_currency" DEFAULT 'RUB' NOT NULL;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "tech_stack" text[];--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "priority" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "last_activity_at" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "companies_status_idx" ON "companies" USING btree ("status");