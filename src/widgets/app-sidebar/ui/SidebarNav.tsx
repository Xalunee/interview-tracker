'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/cn';

import { NAV_ITEMS } from '../model/nav-items';
import { APP_SIDEBAR_STRINGS } from '../model/strings';

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav aria-label={APP_SIDEBAR_STRINGS.navLabel}>
      <ul className="flex flex-col gap-1 px-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150',
                  isActive ? 'font-medium' : 'hover:bg-[var(--color-surface-subtle)]',
                )}
                style={{
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  backgroundColor: isActive ? 'var(--color-accent-subtle)' : undefined,
                }}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
