'use client';

import Link from 'next/link';

import { useScrolled } from '@/shared/hooks';

import { LANDING_STRINGS } from '../model/strings';

const S = LANDING_STRINGS.nav;

function LogoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="2" fill="var(--color-accent)" />
      <rect x="13" y="3" width="8" height="5" rx="2" fill="var(--color-accent)" opacity="0.5" />
      <rect x="3" y="13" width="8" height="5" rx="2" fill="var(--color-accent)" opacity="0.5" />
      <rect x="13" y="10" width="8" height="11" rx="2" fill="var(--color-accent)" opacity="0.3" />
    </svg>
  );
}

export function LandingNav() {
  const scrolled = useScrolled(20);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-[var(--z-fixed)] transition-all duration-200"
      style={{
        background: scrolled ? 'var(--color-surface-glass)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '0.5px solid var(--color-border)' : '0.5px solid transparent',
      }}
    >
      <div
        className="mx-auto flex max-w-6xl items-center justify-between px-6"
        style={{ height: '64px' }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-medium"
          style={{ color: 'var(--color-text-primary)', fontSize: 'var(--text-base)' }}
        >
          <LogoIcon />
          <span>{S.logo}</span>
        </Link>

        {/* Center links — hidden on mobile */}
        <nav className="hidden items-center gap-8 md:flex">
          {S.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-sm)',
                textDecoration: 'none',
              }}
              className="transition-colors duration-150 hover:text-[var(--color-text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm)',
              textDecoration: 'none',
            }}
            className="transition-colors duration-150 hover:text-[var(--color-text-primary)]"
          >
            {S.signIn}
          </Link>
          <Link
            href="/login"
            className="hidden md:inline-flex"
            style={{
              background: 'var(--color-accent)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '8px 16px',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background var(--duration-base)',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background =
                'var(--color-accent-hover)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-accent)')
            }
          >
            {S.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
