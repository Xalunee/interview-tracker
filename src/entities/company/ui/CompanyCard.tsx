import { formatRelativeTime } from '@/shared/lib/format-date';
import type { CompanyCard as CompanyCardType } from '../model/types';
import { CompanyLogo } from './CompanyLogo';
import { CompanySalaryBadge } from './CompanySalaryBadge';

type Props = {
  company: CompanyCardType;
  onClick?: () => void;
};

export function CompanyCard({ company, onClick }: Props) {
  const {
    name,
    position,
    logoUrl,
    salaryMin,
    salaryMax,
    salaryCurrency,
    techStack,
    lastActivityAt,
    createdAt,
  } = company;

  const activityDate = lastActivityAt ?? createdAt;
  const firstTag = techStack?.[0];

  return (
    <article
      onClick={onClick}
      style={{
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px',
        cursor: onClick ? 'pointer' : 'grab',
        transition: `transform var(--duration-base) var(--ease-spring),
          border-color var(--duration-base) var(--ease-standard),
          box-shadow var(--duration-base) var(--ease-standard)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.borderColor = 'var(--color-border-strong)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* Header: logo + name + position */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
        <CompanyLogo logoUrl={logoUrl} name={name} size="md" />
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </p>
          {position && (
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)',
                marginTop: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {position}
            </p>
          )}
        </div>
      </div>

      {/* Badges row */}
      {(salaryMin ?? salaryMax ?? firstTag) && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          <CompanySalaryBadge
            salaryMin={salaryMin}
            salaryMax={salaryMax}
            currency={salaryCurrency}
          />
          {firstTag && (
            <span
              style={{
                background: 'var(--color-surface-subtle)',
                color: 'var(--color-text-tertiary)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-xs)',
                fontWeight: 400,
                border: '0.5px solid var(--color-border)',
              }}
            >
              {firstTag}
            </span>
          )}
        </div>
      )}

      {/* Footer: relative time */}
      <p
        style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-quaternary)',
          marginTop: 4,
        }}
      >
        {formatRelativeTime(activityDate)}
      </p>
    </article>
  );
}
