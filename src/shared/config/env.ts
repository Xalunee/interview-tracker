import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Auth core
  AUTH_SECRET: z
    .string()
    .min(32, 'AUTH_SECRET must be at least 32 characters. Generate with: openssl rand -base64 32'),
  AUTH_URL: z.string().url(),

  // Auth providers — required at runtime
  AUTH_GOOGLE_ID: z.string().min(1, 'AUTH_GOOGLE_ID is required. Get it from Google Cloud Console'),
  AUTH_GOOGLE_SECRET: z
    .string()
    .min(1, 'AUTH_GOOGLE_SECRET is required. Get it from Google Cloud Console'),

  // Email (Resend)
  AUTH_RESEND_KEY: z
    .string()
    .min(1, 'AUTH_RESEND_KEY is required. Get it from https://resend.com/api-keys'),
  AUTH_EMAIL_FROM: z.string().email('AUTH_EMAIL_FROM must be a valid email'),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('Interview Tracker'),

  // External services with sensible defaults
  CLEARBIT_LOGO_API: z.string().url().default('https://logo.clearbit.com'),

  // Node environment
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | undefined;

function parseEnv(): Env {
  if (cachedEnv) return cachedEnv;

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:\n');
    const errors = result.error.flatten().fieldErrors;
    Object.entries(errors).forEach(([key, messages]) => {
      console.error(`  ${key}: ${messages?.join(', ')}`);
    });
    console.error('\nCheck your .env.local file or Vercel environment variables.\n');
    throw new Error('Invalid environment variables');
  }

  cachedEnv = result.data;
  return cachedEnv;
}

export const env = parseEnv();
