import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url().min(1),

  // Auth
  AUTH_SECRET: z.string().min(1),
  AUTH_URL: z.string().url(),

  // Auth providers
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),

  // Email
  AUTH_RESEND_KEY: z.string().optional(),
  AUTH_EMAIL_FROM: z.string().email().optional(),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1),

  // External services
  CLEARBIT_LOGO_API: z.string().url().optional(),
});

type Env = z.infer<typeof envSchema>;

let env: Env;

function getEnv(): Env {
  if (env) return env;

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    const errors = result.error.flatten().fieldErrors;
    Object.entries(errors).forEach(([key, messages]) => {
      console.error(`  ${key}: ${messages?.join(', ')}`);
    });
    throw new Error('Invalid environment variables');
  }

  env = result.data;
  return env;
}

export const config = getEnv();
