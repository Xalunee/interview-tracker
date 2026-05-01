import { ExternalLink, GitBranch, Globe } from 'lucide-react';

import { LANDING_STRINGS } from '../model/strings';

const S = LANDING_STRINGS.footer;

function LogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="2" fill="var(--color-accent)" />
      <rect x="13" y="3" width="8" height="5" rx="2" fill="var(--color-accent)" opacity="0.5" />
      <rect x="3" y="13" width="8" height="5" rx="2" fill="var(--color-accent)" opacity="0.5" />
      <rect x="13" y="10" width="8" height="11" rx="2" fill="var(--color-accent)" opacity="0.3" />
    </svg>
  );
}

export function LandingFooter() {
  return (
    <footer
      style={{
        borderTop: '0.5px solid var(--color-border)',
        background: 'var(--color-background)',
        padding: '48px 0 32px',
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Top: logo + columns */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <LogoIcon />
              <span
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                }}
              >
                {S.logo}
              </span>
            </div>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-tertiary)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {S.tagline}
            </p>
          </div>

          {/* Link columns */}
          {S.columns.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  color: 'var(--color-text-tertiary)',
                  letterSpacing: '0.05em',
                  marginBottom: '12px',
                }}
              >
                {col.title}
              </div>
              <ul
                className="flex flex-col gap-2"
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                      }}
                      className="transition-colors duration-150 hover:text-[var(--color-text-primary)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: copyright + socials */}
        <div
          className="flex flex-col items-center justify-between gap-4 md:flex-row"
          style={{
            borderTop: '0.5px solid var(--color-border)',
            paddingTop: '24px',
          }}
        >
          <span
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            {S.copyright}
          </span>
          <div className="flex items-center gap-4">
            {[
              { Icon: GitBranch, label: 'GitHub' },
              { Icon: Globe, label: 'Сайт' },
              { Icon: ExternalLink, label: 'Ссылки' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{ color: 'var(--color-text-tertiary)' }}
                className="transition-colors duration-150 hover:text-[var(--color-text-primary)]"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
