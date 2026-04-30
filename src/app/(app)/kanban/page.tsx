const STRINGS = {
  title: 'Kanban',
  body: 'Эта страница появится в Дне 4.',
} as const;

export default function KanbanPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>{STRINGS.title}</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>{STRINGS.body}</p>
    </div>
  );
}
