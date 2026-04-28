import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '@/shared/config';
import * as schema from './schema';

const neonClient = drizzle({
  connection: env.DATABASE_URL,
  schema,
});

export const db = neonClient;
