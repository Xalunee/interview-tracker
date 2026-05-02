import { requireAuth } from '@/shared/auth/session';
import { Button } from '@/shared/ui';
import { CreateCompanyDialog } from '@/features/company-create';
import { KanbanBoard } from '@/widgets/kanban-board';

const STRINGS = {
  title: 'Моя доска',
  addButton: 'Добавить компанию',
} as const;

export default async function KanbanPage() {
  const session = await requireAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}>
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          {STRINGS.title}
        </h1>
        <CreateCompanyDialog>
          <Button size="sm">{STRINGS.addButton}</Button>
        </CreateCompanyDialog>
      </div>

      {/* Kanban board */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <KanbanBoard userId={session.user.id} />
      </div>
    </div>
  );
}
