'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { sendMagicLink } from '../api/send-magic-link';
import { magicLinkSchema, type MagicLinkInput } from '../model/schema';
import { AUTH_MAGIC_LINK_STRINGS } from '../model/strings';

export function MagicLinkForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MagicLinkInput>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = handleSubmit((values) => {
    setSubmitError(null);
    startTransition(async () => {
      const result = await sendMagicLink(values);
      if (!result.success) {
        setSubmitError(
          result.error.fieldErrors?.email?.[0] ??
            result.error.message ??
            AUTH_MAGIC_LINK_STRINGS.errors.sendFailed,
        );
        return;
      }
      router.push('/verify');
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        <span style={{ color: 'var(--color-text-secondary)' }}>
          {AUTH_MAGIC_LINK_STRINGS.emailLabel}
        </span>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          placeholder={AUTH_MAGIC_LINK_STRINGS.emailPlaceholder}
          disabled={isPending}
          className="rounded-md border px-3 py-2"
          style={{ borderColor: 'var(--color-text-quaternary)' }}
        />
        {errors.email && (
          <span style={{ color: 'var(--color-danger-text)' }}>{errors.email.message}</span>
        )}
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md px-4 py-2 text-white disabled:opacity-50"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        {isPending
          ? AUTH_MAGIC_LINK_STRINGS.submitLoadingLabel
          : AUTH_MAGIC_LINK_STRINGS.submitLabel}
      </button>
      {submitError && (
        <p className="text-sm" style={{ color: 'var(--color-danger-text)' }}>
          {submitError}
        </p>
      )}
    </form>
  );
}
