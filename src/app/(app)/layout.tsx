import { redirect } from 'next/navigation';

import { getSession } from '@/shared/auth/session';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session?.user?.id) {
    redirect('/login');
  }

  return <div className="min-h-screen p-8">{children}</div>;
}
