'use client';

import { Settings } from 'lucide-react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useCurrentUser, UserAvatar, UserBadge } from '@/entities/user';
import { LogoutButton } from '@/features/auth-logout';

import { APP_HEADER_STRINGS } from '../model/strings';

export function UserMenu() {
  const { user } = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">
          <UserAvatar
            name={user?.name ?? null}
            email={user?.email ?? null}
            image={user?.image ?? null}
            size="md"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{APP_HEADER_STRINGS.userMenuTitle}</DropdownMenuLabel>
        <div className="px-2 pb-2">
          <UserBadge name={user?.name ?? null} email={user?.email ?? null} />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex cursor-pointer items-center gap-2">
            <Settings className="h-4 w-4" />
            {APP_HEADER_STRINGS.userMenuItems.settings}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
          <LogoutButton variant="menu-item" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
