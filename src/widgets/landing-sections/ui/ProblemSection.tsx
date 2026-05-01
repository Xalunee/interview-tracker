import { BrainCircuit, Layers, TrendingDown } from 'lucide-react';

import { LANDING_STRINGS } from '../model/strings';

const S = LANDING_STRINGS.problem;

const ICON_MAP = {
  Layers,
  BrainCircuit,
  TrendingDown,
} as const;

type IconName = keyof typeof ICON_MAP;

export function ProblemSection() {
  return (
    <section data-animate style={{ padding: '96px 0', background: 'var(--color-background)' }}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, var(--text-3xl))',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              margin: '0 0 12px',
              letterSpacing: '-0.01em',
            }}
          >
            {S.title}
          </h2>
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-secondary)',
              margin: 0,
            }}
          >
            {S.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {S.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon as IconName];
            return (
              <div
                key={item.title}
                data-animate
                data-animate-delay={i > 0 ? (`${i}` as '1' | '2') : undefined}
                style={{
                  background: 'var(--color-surface)',
                  border: '0.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-accent-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    color: 'var(--color-accent)',
                  }}
                >
                  <Icon size={20} />
                </div>
                <h3
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    margin: '0 0 10px',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
