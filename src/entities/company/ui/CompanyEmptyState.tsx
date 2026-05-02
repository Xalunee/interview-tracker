import { Plus } from 'lucide-react';

type Props = {
  onClick?: () => void;
};

export function CompanyEmptyState({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '20px 14px',
        borderRadius: 'var(--radius-md)',
        border: '1.5px dashed var(--color-border)',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        transition: `border-color var(--duration-base) var(--ease-standard),
          background var(--duration-base) var(--ease-standard)`,
        color: 'var(--color-text-quaternary)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)';
        e.currentTarget.style.background = 'var(--color-surface-subtle)';
        e.currentTarget.style.color = 'var(--color-text-tertiary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--color-text-quaternary)';
      }}
    >
      <Plus size={18} strokeWidth={1.5} />
      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 400 }}>Добавить компанию</span>
    </button>
  );
}
