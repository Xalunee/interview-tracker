import { LANDING_STRINGS } from '../model/strings';

const S = LANDING_STRINGS.showcase;

export function ShowcaseSection() {
  return (
    <section id="showcase" style={{ padding: '96px 0', background: 'var(--color-surface-subtle)' }}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div data-animate className="mb-16 text-center">
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

        {/* Two panels */}
        <div data-animate className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Funnel */}
          <div
            style={{
              background: 'var(--color-surface)',
              border: '0.5px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--color-text-tertiary)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              {S.funnel.title}
            </div>
            <div className="flex flex-col gap-3">
              {S.funnel.stages.map((stage) => (
                <div key={stage.label} className="flex items-center gap-3">
                  <span
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      width: '90px',
                      flexShrink: 0,
                    }}
                  >
                    {stage.label}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '8px',
                      background: 'var(--color-surface-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${stage.widthPct}%`,
                        height: '100%',
                        background: stage.isOffer ? 'var(--stage-offer-bg)' : 'var(--color-accent)',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'width 0.6s var(--ease-spring)',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: stage.isOffer
                        ? 'var(--stage-offer-text)'
                        : 'var(--color-text-primary)',
                      width: '24px',
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    {stage.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top questions */}
          <div
            style={{
              background: 'var(--color-surface)',
              border: '0.5px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--color-text-tertiary)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              {S.topQuestions.title}
            </div>
            <div className="flex flex-col gap-4">
              {S.topQuestions.items.map((item) => (
                <div key={item.question}>
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.question}
                    </span>
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 500,
                        color: 'var(--color-accent)',
                        marginLeft: '12px',
                        flexShrink: 0,
                      }}
                    >
                      {item.percent}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: '4px',
                      background: 'var(--color-surface-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${item.percent}%`,
                        height: '100%',
                        background: 'var(--color-accent)',
                        borderRadius: 'var(--radius-sm)',
                        opacity: 0.4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div data-animate className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {S.kpis.map((kpi, i) => (
            <div
              key={kpi.label}
              data-animate-delay={i > 0 ? (`${i}` as '1' | '2') : undefined}
              style={{
                background: 'var(--color-surface)',
                border: '0.5px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 500,
                  color: 'var(--color-accent)',
                  letterSpacing: '-0.02em',
                  marginBottom: '6px',
                }}
              >
                {kpi.value}
              </div>
              <div
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  marginBottom: '4px',
                }}
              >
                {kpi.label}
              </div>
              <div
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                {kpi.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
