import { drizzle } from 'drizzle-orm/neon-http';
import { config } from '@/shared/config';
import * as schema from './schema';

const neonClient = drizzle({
  connection: config.DATABASE_URL,
  schema,
});

export const db = neonClient;
