import { LANDING_STRINGS } from '../model/strings';

const S = LANDING_STRINGS.faq;

export function FaqSection() {
  return (
    <section
      id="faq"
      data-animate
      style={{ padding: '96px 0', background: 'var(--color-background)' }}
    >
      <div className="mx-auto max-w-3xl px-6">
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

        {/* Accordion */}
        <div
          style={{
            borderTop: '0.5px solid var(--color-border)',
          }}
        >
          {S.items.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p className="faq-answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
