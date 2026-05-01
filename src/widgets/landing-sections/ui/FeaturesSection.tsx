import { Bell, Check, CheckCircle, Circle, Command, NotebookPen, Search } from 'lucide-react';

import { LANDING_STRINGS } from '../model/strings';

const S = LANDING_STRINGS.features;

function KanbanMockupSmall() {
  const columns = [
    {
      label: 'Wishlist',
      bg: 'var(--stage-wishlist-bg)',
      text: 'var(--stage-wishlist-text)',
      cards: ['Яндекс', 'ВК'],
    },
    {
      label: 'HR-скрин',
      bg: 'var(--stage-hr-screen-bg)',
      text: 'var(--stage-hr-screen-text)',
      cards: ['Авито'],
    },
    {
      label: 'Оффер',
      bg: 'var(--stage-offer-bg)',
      text: 'var(--stage-offer-text)',
      cards: ['Сбер'],
    },
  ];

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '0.5px solid var(--color-border)',
          fontSize: 'var(--text-sm)',
          fontWeight: 500,
          color: 'var(--color-text-secondary)',
        }}
      >
        Канбан-доска
      </div>
      <div className="flex gap-2 p-3">
        {columns.map((col, colIdx) => (
          <div key={col.label} style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                background: col.bg,
                color: col.text,
                borderRadius: 'var(--radius-sm)',
                padding: '3px 8px',
                fontSize: '10px',
                fontWeight: 600,
                marginBottom: '6px',
              }}
            >
              {col.label}
            </div>
            {col.cards.map((card, cardIdx) => (
              <div
                key={card}
                style={{
                  background: 'var(--color-background)',
                  border: '0.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px',
                  marginBottom: '4px',
                  fontSize: '11px',
                  color: 'var(--color-text-primary)',
                  fontWeight: 500,
                  boxShadow:
                    colIdx === 0 && cardIdx === 0 ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  transform: colIdx === 0 && cardIdx === 0 ? 'translateY(-2px)' : 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                {card}
                <div
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-text-tertiary)',
                    marginTop: '2px',
                  }}
                >
                  Senior Frontend
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const MOCK_QUESTIONS = [
  {
    text: 'Расскажите о системе, которой вы гордитесь',
    tags: ['Архитектура', 'Senior'],
    learned: true,
  },
  { text: 'Event Loop и микротаски', tags: ['JS', 'Базовый'], learned: true },
  { text: 'Виртуальный DOM vs реальный DOM', tags: ['React', 'Средний'], learned: false },
  { text: 'Стратегии кэширования на фронтенде', tags: ['Перфоманс', 'Senior'], learned: false },
];

function QuestionsMockupSmall() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '0.5px solid var(--color-border)',
        }}
      >
        <div
          className="flex items-center gap-2"
          style={{
            background: 'var(--color-surface-subtle)',
            border: '0.5px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '6px 10px',
          }}
        >
          <Search size={12} style={{ color: 'var(--color-text-tertiary)' }} />
          <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
            Поиск по вопросам...
          </span>
        </div>
      </div>
      <div style={{ padding: '8px' }}>
        {MOCK_QUESTIONS.map((q) => (
          <div
            key={q.text}
            className="flex items-start gap-2"
            style={{
              padding: '8px',
              borderBottom: '0.5px solid var(--color-border)',
            }}
          >
            {q.learned ? (
              <CheckCircle
                size={14}
                style={{ color: 'var(--color-accent)', marginTop: '1px', flexShrink: 0 }}
              />
            ) : (
              <Circle
                size={14}
                style={{ color: 'var(--color-text-quaternary)', marginTop: '1px', flexShrink: 0 }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-primary)',
                  marginBottom: '4px',
                  lineHeight: 1.4,
                }}
              >
                {q.text}
              </div>
              <div className="flex flex-wrap gap-1">
                {q.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '10px',
                      background: 'var(--color-neutral-bg)',
                      color: 'var(--color-neutral-text)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1px 6px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FUNNEL_STAGES = [
  { label: 'Подано', count: 47, pct: 100 },
  { label: 'HR-скрин', count: 23, pct: 49 },
  { label: 'Тех. раунд', count: 12, pct: 26 },
  { label: 'Оффер', count: 2, pct: 4 },
];

function AnalyticsMockupSmall() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '0.5px solid var(--color-border)',
          fontSize: 'var(--text-sm)',
          fontWeight: 500,
          color: 'var(--color-text-secondary)',
        }}
      >
        Аналитика
      </div>
      <div style={{ padding: '16px' }}>
        {/* KPI row */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          {[
            { value: '4.3%', label: 'Конверсия' },
            { value: '28 дн.', label: 'До оффера' },
          ].map((kpi) => (
            <div
              key={kpi.label}
              style={{
                background: 'var(--color-surface-subtle)',
                border: '0.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '10px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 500,
                  color: 'var(--color-accent)',
                }}
              >
                {kpi.value}
              </div>
              <div
                style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}
              >
                {kpi.label}
              </div>
            </div>
          ))}
        </div>
        {/* Funnel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {FUNNEL_STAGES.map((stage) => (
            <div key={stage.label} className="flex items-center gap-2">
              <span
                style={{
                  fontSize: '10px',
                  color: 'var(--color-text-secondary)',
                  width: '70px',
                  flexShrink: 0,
                }}
              >
                {stage.label}
              </span>
              <div
                style={{
                  flex: 1,
                  background: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  height: '6px',
                }}
              >
                <div
                  style={{
                    width: `${stage.pct}%`,
                    height: '100%',
                    background: 'var(--color-accent)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '10px',
                  color: 'var(--color-text-tertiary)',
                  width: '20px',
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
    </div>
  );
}

const MOCKUP_MAP = {
  kanban: KanbanMockupSmall,
  questions: QuestionsMockupSmall,
  analytics: AnalyticsMockupSmall,
} as const;

const COMPACT_ICON_MAP = {
  NotebookPen,
  Bell,
  Command,
} as const;

type CompactIconName = keyof typeof COMPACT_ICON_MAP;

export function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '96px 0', background: 'var(--color-surface-subtle)' }}>
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

        {/* Alternating features */}
        <div className="mb-24 flex flex-col gap-24">
          {S.main.map((feature) => {
            const MockupComponent = MOCKUP_MAP[feature.mockupType];
            return (
              <div
                key={feature.number}
                data-animate
                className={`flex flex-col items-center gap-12 md:flex-row ${
                  !feature.textLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Text */}
                <div className="flex flex-col gap-5 md:w-5/12">
                  <div
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-accent)',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {feature.number}
                  </div>
                  <h3
                    style={{
                      fontSize: 'clamp(1.25rem, 2vw, var(--text-2xl))',
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                      margin: 0,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-lg)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {feature.description}
                  </p>
                  <ul
                    className="flex flex-col gap-3"
                    style={{ listStyle: 'none', padding: 0, margin: 0 }}
                  >
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2">
                        <Check size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                        <span
                          style={{
                            fontSize: 'var(--text-base)',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mockup */}
                <div className="w-full md:w-7/12">
                  <MockupComponent />
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact features grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {S.compact.map((item, i) => {
            const Icon = COMPACT_ICON_MAP[item.icon as CompactIconName];
            return (
              <div
                key={item.title}
                data-animate
                data-animate-delay={i > 0 ? (`${i}` as '1' | '2') : undefined}
                style={{
                  background: 'var(--color-surface)',
                  border: '0.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
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
                    marginBottom: '16px',
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
                    margin: '0 0 8px',
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
