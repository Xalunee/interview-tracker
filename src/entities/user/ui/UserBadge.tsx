type UserBadgeProps = {
  name?: string | null;
  email?: string | null;
};

export function UserBadge({ name, email }: UserBadgeProps) {
  return (
    <div className="flex min-w-0 flex-col">
      {name && (
        <span
          className="truncate text-sm font-medium"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {name}
        </span>
      )}
      {email && (
        <span className="truncate text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          {email}
        </span>
      )}
    </div>
  );
}
