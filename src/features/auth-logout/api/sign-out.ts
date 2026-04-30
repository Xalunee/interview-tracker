'use server';

import { signOut } from '@/shared/auth/config';

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: '/' });
}
