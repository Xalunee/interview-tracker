const STRINGS = {
  title: 'Вопросы',
  body: 'Эта страница появится в Дне 9.',
} as const;

export default function QuestionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>{STRINGS.title}</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>{STRINGS.body}</p>
    </div>
  );
}
