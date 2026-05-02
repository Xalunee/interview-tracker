import { Plus } from 'lucide-react';
import { CompanyCard, CompanyEmptyState } from '@/entities/company';
import type { CompanyCard as CompanyCardType } from '@/entities/company/model/types';
import type { Company } from '@/entities/company/model/types';
import { CreateCompanyDialog } from '@/features/company-create';

type Props = {
  status: Company['status'];
  label: string;
  bgVar: string;
  textVar: string;
  companies: CompanyCardType[];
};

export function KanbanColumn({ status, label, bgVar, textVar, companies }: Props) {
  return (
    <div
      style={{
        width: 280,
        minWidth: 280,
        background: 'var(--color-surface-subtle)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
      }}
    >
      {/* Column header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 12px 8px',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            background: bgVar,
            color: textVar,
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
          }}
        >
          {label}
        </span>
        {companies.length > 0 && (
          <span
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-quaternary)',
              fontWeight: 400,
            }}
          >
            {companies.length}
          </span>
        )}
        <div style={{ marginLeft: 'auto' }}>
          <CreateCompanyDialog defaultStatus={status}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--color-text-quaternary)',
                transition: `background var(--duration-base) var(--ease-standard),
                  color var(--duration-base) var(--ease-standard)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-surface)';
                e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--color-text-quaternary)';
              }}
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          </CreateCompanyDialog>
        </div>
      </div>

      {/* Cards list */}
      <div
        style={{
          overflowY: 'auto',
          padding: '0 12px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          flex: 1,
        }}
      >
        {companies.length === 0 ? (
          <CreateCompanyDialog defaultStatus={status}>
            <CompanyEmptyState />
          </CreateCompanyDialog>
        ) : (
          companies.map((company) => <CompanyCard key={company.id} company={company} />)
        )}
      </div>
    </div>
  );
}
