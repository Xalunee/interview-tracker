const STRINGS = {
  title: 'Компании',
  body: 'Эта страница появится в Дне 6.',
} as const;

export default function CompaniesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>{STRINGS.title}</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>{STRINGS.body}</p>
    </div>
  );
}
