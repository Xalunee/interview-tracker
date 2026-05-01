import Link from 'next/link';

import { LANDING_STRINGS } from '../model/strings';

const S = LANDING_STRINGS.cta;

export function CtaSection() {
  return (
    <section
      data-animate
      style={{
        background: '#1D1D1F',
        padding: '96px 24px',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="flex flex-col items-center gap-6 text-center" style={{ maxWidth: '640px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 4vw, var(--text-3xl))',
            fontWeight: 500,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {S.title}
        </h2>
        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {S.subtitle}
        </p>
        <Link
          href="/login"
          className="cta-button"
          style={{
            background: '#ffffff',
            color: '#1D1D1F',
            borderRadius: 'var(--radius-md)',
            padding: '16px 32px',
            fontSize: 'var(--text-base)',
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
          }}
        >
          {S.button}
        </Link>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'rgba(255, 255, 255, 0.5)',
            margin: 0,
          }}
        >
          {S.disclaimer}
        </p>
      </div>
    </section>
  );
}
