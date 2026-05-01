import { LANDING_STRINGS } from '../model/strings';

const S = LANDING_STRINGS.socialProof;

export function SocialProofSection() {
  return (
    <div
      style={{
        borderTop: '0.5px solid var(--color-border)',
        borderBottom: '0.5px solid var(--color-border)',
        background: 'var(--color-surface-subtle)',
        padding: '16px 0',
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 px-6">
        <span
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-tertiary)',
            flexShrink: 0,
          }}
        >
          {S.label}
        </span>
        {S.companies.map((company, i) => (
          <span key={company} className="flex items-center gap-3">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-tertiary)',
                letterSpacing: '-0.01em',
              }}
            >
              {company}
            </span>
            {i < S.companies.length - 1 && (
              <span style={{ color: 'var(--color-border)', userSelect: 'none' }}>·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
