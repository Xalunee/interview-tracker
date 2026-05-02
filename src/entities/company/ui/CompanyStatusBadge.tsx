import { STAGE_CONFIG } from '../model/stage-config';
import type { Company } from '../model/types';

type Props = {
  status: Company['status'];
};

export function CompanyStatusBadge({ status }: Props) {
  const config = STAGE_CONFIG[status];

  return (
    <span
      style={{
        background: config.bgVar,
        color: config.textVar,
        padding: '2px 8px',
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--text-xs)',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {config.label}
    </span>
  );
}
