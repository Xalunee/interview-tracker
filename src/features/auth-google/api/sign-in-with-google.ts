'use server';

import { signIn } from '@/shared/auth/config';

export async function signInWithGoogle(callbackUrl?: string): Promise<void> {
  await signIn('google', { redirectTo: callbackUrl ?? '/dashboard' });
}
