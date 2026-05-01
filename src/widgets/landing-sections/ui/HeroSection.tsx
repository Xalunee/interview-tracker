import Link from 'next/link';

import { LANDING_STRINGS } from '../model/strings';

const S = LANDING_STRINGS.hero;

const FALLBACK_COLORS = { bg: 'var(--stage-wishlist-bg)', text: 'var(--stage-wishlist-text)' };

const STAGE_COLORS: Record<string, { bg: string; text: string }> = {
  wishlist: {
    bg: 'var(--stage-wishlist-bg)',
    text: 'var(--stage-wishlist-text)',
  },
  'hr-screen': {
    bg: 'var(--stage-hr-screen-bg)',
    text: 'var(--stage-hr-screen-text)',
  },
  'tech-round': {
    bg: 'var(--stage-tech-round-bg)',
    text: 'var(--stage-tech-round-text)',
  },
  offer: {
    bg: 'var(--stage-offer-bg)',
    text: 'var(--stage-offer-text)',
  },
};

function KanbanCard({
  company,
  initial,
  role,
  salary,
  stageKey,
}: {
  company: string;
  initial: string;
  role: string;
  salary: string;
  stageKey: string;
}) {
  const colors = STAGE_COLORS[stageKey] ?? FALLBACK_COLORS;
  return (
    <div
      style={{
        background: 'var(--color-background)',
        border: '0.5px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '10px',
        marginBottom: '6px',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="mb-1 flex items-center gap-2">
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: 'var(--radius-sm)',
            background: colors.bg,
            color: colors.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {initial}
        </div>
        <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
          {company}
        </span>
      </div>
      <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
        {role}
      </div>
      <div style={{ fontSize: '10px', color: 'var(--color-accent)', fontWeight: 500 }}>
        {salary}
      </div>
    </div>
  );
}

function KanbanMockup() {
  const { columns, cards, title } = S.kanban;

  return (
    <div className="hero-kanban-3d" style={{ transformOrigin: 'center center' }}>
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          border: '0.5px solid var(--color-border)',
          minWidth: '0',
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-4"
          style={{
            height: '40px',
            borderBottom: '0.5px solid var(--color-border)',
            background: 'var(--color-surface)',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#FF5F57',
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#FFBD2E',
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#28C840',
              flexShrink: 0,
            }}
          />
          <span
            className="flex-1 text-center"
            style={{
              fontSize: '11px',
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {title}
          </span>
        </div>

        {/* Kanban columns */}
        <div
          className="flex gap-2 overflow-x-auto p-3"
          style={{ background: 'var(--color-surface-subtle)' }}
        >
          {columns.map((col, colIdx) => {
            const colCards = cards.filter((c) => c.column === colIdx);
            const colors = STAGE_COLORS[col.stageKey] ?? FALLBACK_COLORS;
            return (
              <div key={col.stageKey} style={{ minWidth: '130px', flexShrink: 0 }}>
                {/* Column header */}
                <div
                  className="mb-2 flex items-center gap-1 px-2 py-1"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: colors.bg,
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 600, color: colors.text }}>
                    {col.label}
                  </span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: colors.text,
                      opacity: 0.7,
                    }}
                  >
                    {colCards.length}
                  </span>
                </div>
                {/* Cards */}
                {colCards.map((card) => (
                  <KanbanCard
                    key={card.company}
                    company={card.company}
                    initial={card.initial}
                    role={card.role}
                    salary={card.salary}
                    stageKey={col.stageKey}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      style={{ paddingTop: '120px', paddingBottom: '96px', background: 'var(--color-background)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Left — text */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div>
              <span
                style={{
                  display: 'inline-block',
                  background: 'var(--color-neutral-bg)',
                  color: 'var(--color-neutral-text)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '4px 12px',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  border: '0.5px solid var(--color-border)',
                }}
              >
                {S.badge}
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, var(--text-4xl))',
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              {S.title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {S.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                style={{
                  background: 'var(--color-accent)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 24px',
                  fontSize: 'var(--text-base)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  boxShadow: '0 4px 14px rgba(0, 122, 255, 0.3)',
                }}
              >
                {S.primaryCta}
              </Link>
              <a
                href="#showcase"
                style={{
                  background: 'transparent',
                  color: 'var(--color-text-primary)',
                  border: '0.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 24px',
                  fontSize: 'var(--text-base)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {S.secondaryCta}
              </a>
            </div>

            {/* Disclaimer */}
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-tertiary)',
                margin: 0,
              }}
            >
              {S.disclaimer}
            </p>
          </div>

          {/* Right — kanban mockup */}
          <div className="w-full">
            <KanbanMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
