'use client';

import { useTransition } from 'react';

import { signOutAction } from '../api/sign-out';
import { AUTH_LOGOUT_STRINGS } from '../model/strings';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      void signOutAction();
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="rounded-md border px-4 py-2 disabled:opacity-50"
      style={{ borderColor: 'var(--color-text-quaternary)' }}
    >
      {AUTH_LOGOUT_STRINGS.buttonLabel}
    </button>
  );
}
