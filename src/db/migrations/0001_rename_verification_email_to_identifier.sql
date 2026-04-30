ALTER TABLE "verification_tokens" DROP CONSTRAINT "verification_tokens_email_token_pk";--> statement-breakpoint
ALTER TABLE "verification_tokens" RENAME COLUMN "email" TO "identifier";--> statement-breakpoint
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token");
