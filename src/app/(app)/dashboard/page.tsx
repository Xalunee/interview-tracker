import { getSession } from '@/shared/auth/session';

const STRINGS = {
  greetingPrefix: 'Привет',
  fallbackName: 'друг',
  body: 'Это ваш dashboard. На Дне 4 здесь появятся карточки компаний.',
} as const;

export default async function DashboardPage() {
  const session = await getSession();
  const displayName = session?.user?.name ?? session?.user?.email ?? STRINGS.fallbackName;

  return (
    <div className="flex flex-col gap-6">
      <h1>{`${STRINGS.greetingPrefix}, ${displayName}!`}</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>{STRINGS.body}</p>
    </div>
  );
}
