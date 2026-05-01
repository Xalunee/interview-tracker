'use client';

import { LogOut } from 'lucide-react';
import { useTransition } from 'react';

import { cn } from '@/shared/lib/cn';

import { signOutAction } from '../api/sign-out';
import { AUTH_LOGOUT_STRINGS } from '../model/strings';

type LogoutButtonProps = {
  variant?: 'default' | 'menu-item';
};

export function LogoutButton({ variant = 'default' }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      void signOutAction();
    });
  };

  if (variant === 'menu-item') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className={cn(
          'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
          'text-destructive focus:bg-accent focus:text-accent-foreground',
          'disabled:pointer-events-none disabled:opacity-50',
        )}
      >
        <LogOut className="h-4 w-4" />
        {AUTH_LOGOUT_STRINGS.buttonLabel}
      </button>
    );
  }

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
