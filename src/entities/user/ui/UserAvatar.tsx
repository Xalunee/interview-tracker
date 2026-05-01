import Image from 'next/image';

import { cn } from '@/shared/lib/cn';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

type AvatarSize = 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<AvatarSize, { container: string; image: number }> = {
  sm: { container: 'h-6 w-6 text-[10px]', image: 24 },
  md: { container: 'h-8 w-8 text-xs', image: 32 },
  lg: { container: 'h-10 w-10 text-sm', image: 40 },
};

type UserAvatarProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  size?: AvatarSize;
  className?: string;
};

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
    }
    return name[0]!.toUpperCase();
  }
  if (email) return email[0]!.toUpperCase();
  return '?';
}

export function UserAvatar({ name, email, image, size = 'md', className }: UserAvatarProps) {
  const { container, image: imageSize } = SIZE_MAP[size];
  const initials = getInitials(name, email);

  return (
    <Avatar className={cn(container, className)}>
      {image && (
        <AvatarImage asChild>
          <Image src={image} alt={name ?? email ?? 'User'} width={imageSize} height={imageSize} />
        </AvatarImage>
      )}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
