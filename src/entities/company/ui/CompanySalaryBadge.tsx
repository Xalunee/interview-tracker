import { formatSalary } from '../lib/format-salary';

type Props = {
  salaryMin: number | null | undefined;
  salaryMax: number | null | undefined;
  currency: string;
};

export function CompanySalaryBadge({ salaryMin, salaryMax, currency }: Props) {
  const label = formatSalary(salaryMin, salaryMax, currency);
  if (!label) return null;

  return (
    <span
      style={{
        background: 'var(--color-success-bg)',
        color: 'var(--color-success-text)',
        padding: '2px 8px',
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--text-xs)',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}
