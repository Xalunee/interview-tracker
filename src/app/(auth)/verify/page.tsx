const STRINGS = {
  title: 'Проверьте почту',
  body: 'Мы отправили вам ссылку для входа на email. Откройте её на этом устройстве.',
  hint: 'Ссылка действительна 24 часа.',
} as const;

export default function VerifyPage() {
  return (
    <div className="flex flex-col gap-4 text-center">
      <h2>{STRINGS.title}</h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>{STRINGS.body}</p>
      <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        {STRINGS.hint}
      </p>
    </div>
  );
}
