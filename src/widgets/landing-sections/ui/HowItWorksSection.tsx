import { LANDING_STRINGS } from '../model/strings';

const S = LANDING_STRINGS.howItWorks;

export function HowItWorksSection() {
  return (
    <section
      id="how"
      data-animate
      style={{ padding: '96px 0', background: 'var(--color-background)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
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

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {S.steps.map((step, i) => (
            <div
              key={step.number}
              data-animate
              data-animate-delay={i > 0 ? (`${i}` as '1' | '2') : undefined}
              className="flex flex-col gap-4"
            >
              {/* Step number */}
              <div
                style={{
                  fontSize: 'clamp(2rem, 4vw, var(--text-4xl))',
                  fontWeight: 500,
                  color: 'var(--color-accent)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  opacity: 0.25,
                }}
              >
                {step.number}
              </div>

              {/* Divider */}
              <div
                style={{
                  width: '32px',
                  height: '2px',
                  background: 'var(--color-accent)',
                  borderRadius: '1px',
                }}
              />

              <h3
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
