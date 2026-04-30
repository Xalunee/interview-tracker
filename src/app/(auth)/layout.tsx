import Link from 'next/link';

const STRINGS = {
  appName: 'Interview Tracker',
} as const;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <Link href="/" className="mb-8 text-lg font-medium">
        {STRINGS.appName}
      </Link>
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{ backgroundColor: 'var(--color-surface-subtle)' }}
      >
        {children}
      </div>
    </div>
  );
}
