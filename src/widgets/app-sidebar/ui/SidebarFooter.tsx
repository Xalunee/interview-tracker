'use client';

import { useCurrentUser, UserAvatar } from '@/entities/user';

export function SidebarFooter() {
  const { user } = useCurrentUser();

  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <UserAvatar
        name={user?.name ?? null}
        email={user?.email ?? null}
        image={user?.image ?? null}
        size="sm"
      />
      <span
        className="truncate text-xs font-medium"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {user?.name ?? user?.email ?? ''}
      </span>
    </div>
  );
}
