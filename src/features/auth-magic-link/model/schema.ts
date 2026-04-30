import { z } from 'zod';

import { AUTH_MAGIC_LINK_STRINGS } from './strings';

export const magicLinkSchema = z.object({
  email: z
    .string()
    .min(1, AUTH_MAGIC_LINK_STRINGS.errors.emailRequired)
    .email(AUTH_MAGIC_LINK_STRINGS.errors.emailInvalid),
});

export type MagicLinkInput = z.infer<typeof magicLinkSchema>;
