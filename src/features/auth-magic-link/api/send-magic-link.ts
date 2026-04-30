'use server';

import { serverActionHandler } from '@/shared/api/server-action-handler';
import { signIn } from '@/shared/auth/config';

import { magicLinkSchema } from '../model/schema';

export const sendMagicLink = serverActionHandler(magicLinkSchema, async ({ email }) => {
  await signIn('resend', {
    email,
    redirect: false,
  });
  return { sent: true } as const;
});
