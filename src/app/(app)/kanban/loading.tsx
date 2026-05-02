import { Skeleton } from '@/shared/ui';

function SkeletonColumn() {
  return (
    <div
      style={{
        width: 280,
        minWidth: 280,
        background: 'var(--color-surface-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <Skeleton style={{ height: 24, width: 100, borderRadius: 'var(--radius-sm)' }} />
      <Skeleton style={{ height: 88, borderRadius: 'var(--radius-lg)' }} />
      <Skeleton style={{ height: 72, borderRadius: 'var(--radius-lg)' }} />
      <Skeleton style={{ height: 80, borderRadius: 'var(--radius-lg)' }} />
    </div>
  );
}

export default function KanbanLoading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Skeleton style={{ height: 28, width: 140 }} />
        <Skeleton style={{ height: 32, width: 160, borderRadius: 'var(--radius-md)' }} />
      </div>
      <div style={{ display: 'flex', gap: 16, overflow: 'hidden', flex: 1 }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonColumn key={i} />
        ))}
      </div>
    </div>
  );
}
