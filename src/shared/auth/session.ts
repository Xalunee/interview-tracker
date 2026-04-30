import type { Session } from 'next-auth';

import { ApiError } from '@/shared/api';

import { auth } from './config';

export async function getSession(): Promise<Session | null> {
  return auth();
}

export async function requireAuth(): Promise<Session & { user: { id: string } }> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new ApiError('UNAUTHORIZED', 'You must be logged in', 401);
  }
  return session as Session & { user: { id: string } };
}
