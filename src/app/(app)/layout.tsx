import { redirect } from 'next/navigation';

import { getSession } from '@/shared/auth/session';
import { AppHeader } from '@/widgets/app-header';
import { AppSidebar } from '@/widgets/app-sidebar';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session?.user?.id) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />
        <main
          className="flex-1 overflow-auto p-6"
          style={{ backgroundColor: 'var(--color-background)' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
