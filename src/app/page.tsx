import Link from 'next/link';

const STRINGS = {
  title: 'Interview Tracker',
  tagline: 'Track every interview. Land your next role.',
  signInLabel: 'Войти',
} as const;

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1>{STRINGS.title}</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>{STRINGS.tagline}</p>
      <Link
        href="/login"
        className="inline-block rounded-md px-4 py-2 text-white"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        {STRINGS.signInLabel}
      </Link>
    </main>
  );
}
