import { LayoutDashboard } from 'lucide-react';

import { ThemeToggle } from '@/features/theme-toggle';

import { APP_HEADER_STRINGS } from '../model/strings';
import { UserMenu } from './UserMenu';

export function AppHeader() {
  return (
    <header
      className="glass sticky top-0 flex h-14 items-center justify-between px-6"
      style={{
        zIndex: 'var(--z-sticky)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center gap-2">
        <LayoutDashboard className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
        <span
          className="text-sm font-semibold tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {APP_HEADER_STRINGS.appName}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
