const STRINGS = {
  title: 'Войти в Interview Tracker',
  placeholder: 'Здесь будет форма входа.',
} as const;

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center">{STRINGS.title}</h2>
      <p className="text-center" style={{ color: 'var(--color-text-secondary)' }}>
        {STRINGS.placeholder}
      </p>
    </div>
  );
}
