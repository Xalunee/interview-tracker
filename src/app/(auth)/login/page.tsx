import Link from 'next/link';
import { Suspense } from 'react';

import { GoogleSignInButton } from '@/features/auth-google';
import { MagicLinkForm } from '@/features/auth-magic-link';

const STRINGS = {
  title: 'Войти в Interview Tracker',
  divider: 'или',
  backLink: 'Вернуться на главную',
} as const;

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-center">{STRINGS.title}</h2>
      <Suspense>
        <GoogleSignInButton />
      </Suspense>
      <div className="flex items-center gap-3 text-sm">
        <span className="h-px flex-1" style={{ backgroundColor: 'var(--color-text-quaternary)' }} />
        <span style={{ color: 'var(--color-text-tertiary)' }}>{STRINGS.divider}</span>
        <span className="h-px flex-1" style={{ backgroundColor: 'var(--color-text-quaternary)' }} />
      </div>
      <MagicLinkForm />
      <Link
        href="/"
        className="text-center text-sm"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        {STRINGS.backLink}
      </Link>
    </div>
  );
}
