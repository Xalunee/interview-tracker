import Image from 'next/image';
import { getInitials } from '../lib/get-initials';

const SIZE_MAP = {
  sm: 24,
  md: 32,
  lg: 40,
} as const;

type Props = {
  logoUrl: string | null | undefined;
  name: string;
  size?: keyof typeof SIZE_MAP;
};

export function CompanyLogo({ logoUrl, name, size = 'md' }: Props) {
  const px = SIZE_MAP[size];

  if (logoUrl) {
    return (
      <Image
        src={logoUrl}
        alt={name}
        width={px}
        height={px}
        style={{
          width: px,
          height: px,
          borderRadius: 'var(--radius-sm)',
          objectFit: 'contain',
          flexShrink: 0,
        }}
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement | null;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
    );
  }

  return (
    <span
      style={{
        width: px,
        height: px,
        borderRadius: 'var(--radius-sm)',
        background: 'var(--color-surface-subtle)',
        border: '0.5px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: px * 0.45,
        fontWeight: 500,
        color: 'var(--color-text-secondary)',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {getInitials(name)}
    </span>
  );
}
