import { LayoutDashboard } from 'lucide-react';

import { APP_SIDEBAR_STRINGS } from '../model/strings';
import { SidebarFooter } from './SidebarFooter';
import { SidebarNav } from './SidebarNav';

export function AppSidebar() {
  return (
    <aside
      className="hidden h-screen w-60 shrink-0 flex-col md:flex"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      <div
        className="flex h-14 shrink-0 items-center gap-2 px-6"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <LayoutDashboard className="h-5 w-5 shrink-0" style={{ color: 'var(--color-accent)' }} />
        <span
          className="text-sm font-semibold tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {APP_SIDEBAR_STRINGS.appName}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <SidebarNav />
      </div>

      <SidebarFooter />
    </aside>
  );
}
