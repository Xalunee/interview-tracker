# Interview Tracker — Project Context

This is a personal project: a job application tracker for senior developers,
designed both as a real product and as a portfolio piece demonstrating
senior-level frontend skills.

## Critical Rules

1. **Never use `localStorage`/`sessionStorage`** for application state.
   Use Zustand for client UI state (sidebar collapsed, filters open),
   server state through TanStack Query + Server Actions.
2. **Never hardcode user-facing strings** in components. Extract them to
   `strings.ts` next to the feature. Russian only in MVP, English in v1.1.
3. **Never bypass FSD layer rules.** A layer can only import from layers
   below it. See "FSD Architecture" section.
4. **All mutations go through Server Actions**, never client-side fetch
   to `/api/*`. The only `/api/*` route is for Auth.js.
5. **All env access** through `@/shared/config/env`, never `process.env.*`
   directly. Env vars are validated via Zod at startup.
6. **All user inputs validated through Zod schemas** before reaching DB.
7. **Soft delete only for `companies`**. Other entities use hard delete with
   cascade. Companies have `deleted_at` timestamp.
8. **All commits follow Conventional Commits** format: `type(scope): subject`.
   Types: feat, fix, refactor, style, docs, test, chore, perf, ci, build.

## Tech Stack (with versions where critical)

- **Next.js 14** with App Router (NOT Pages Router)
- **TypeScript** with strict mode + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`
- **React 18** with Server Components and Server Actions
- **Drizzle ORM** with `drizzle-kit` for migrations
- **Neon** (serverless PostgreSQL)
- **Auth.js v5** with Drizzle adapter, JWT strategy
- **Tailwind CSS v4** with CSS-first config (`@theme` in CSS, not JS)
- **shadcn/ui** components (copied into `src/shared/ui/`, not as a library)
- **Zustand** for client UI state
- **TanStack Query** v5 for server state
- **React Hook Form** + **Zod** for forms
- **dnd-kit** + `fractional-indexing` library for kanban drag-and-drop
- **Tremor** for analytics charts (fallback to Recharts if needed)
- **Vitest** + **Playwright** for testing
- **pnpm** as package manager
- **Geist** font (sans + mono)

## FSD Architecture

We use Feature-Sliced Design adapted for Next.js App Router.

### Layer Structure (top to bottom)

src/
├── app/ ← Next.js App Router root
│ ├── \_providers/ ← FSD "app" layer: providers, theme, query
│ ├── \_styles/ ← globals.css, design tokens
│ ├── (auth)/ ← public auth pages route group
│ ├── (app)/ ← protected pages route group
│ └── api/auth/ ← Auth.js handler only
├── widgets/ ← composed UI blocks (kanban-board, app-sidebar, ...)
├── features/ ← user actions (company-create, drag-drop, ...)
├── entities/ ← business entities (company, interview, question, ...)
├── shared/ ← UI kit, utilities, configs
└── db/ ← Drizzle schema and client (infra, not FSD)

### Import Rules (CRITICAL)

A layer can ONLY import from layers below it:

- `app/` → widgets, features, entities, shared, db
- `widgets/` → features, entities, shared
- `features/` → entities, shared, db (for Server Actions only)
- `entities/` → shared, db (for read APIs only)
- `shared/` → only itself, plus db for server-side utilities

**NEVER** import sibling slices in the same layer:

- ❌ `entities/company` cannot import from `entities/interview`
- ❌ `features/company-create` cannot import from `features/interview-create`

If two slices need to share something — promote it to `shared/` or compose
them in a higher layer (widget or page).

### Slice Internal Structure

Each slice has these segments (only what's needed):
slice-name/
├── ui/ ← React components
├── model/ ← state, business logic, types, schemas
├── api/ ← server actions (mutations) or fetch functions (reads)
├── lib/ ← utilities specific to this slice
└── index.ts ← public API: only export what's needed externally

### Slice Size

Soft limit: 8-10 files per slice. If a slice grows larger, split it.

## Path Aliases

`@/` → `src/`

Use absolute imports everywhere. Example: `@/entities/company`, not `../../../entities/company`.

## Database Schema

## Auth.js v5 + Drizzle Adapter — Known Quirks

Эти особенности выявлены в процессе разработки. Не "исправлять" — это намеренное поведение адаптера.

### 1. Таблица `accounts` — смешанный camelCase/snake_case

`@auth/drizzle-adapter` ожидает **разные стили именования** JS-ключей в таблице `accounts`:

- Domain-поля — camelCase: `userId`, `providerAccountId`
- OAuth-поля — snake_case: `refresh_token`, `access_token`, `expires_at`, `token_type`, `id_token`, `session_state`

```typescript
// ✅ Правильно
export const accounts = pgTable('accounts', {
  userId: text('user_id'), // camelCase JS-ключ
  providerAccountId: text('provider_account_id'), // camelCase JS-ключ
  refresh_token: text('refresh_token'), // snake_case JS-ключ ← намеренно
  access_token: text('access_token'), // snake_case JS-ключ ← намеренно
  expires_at: integer('expires_at'), // snake_case JS-ключ ← намеренно
  token_type: text('token_type'), // snake_case JS-ключ ← намеренно
  id_token: text('id_token'), // snake_case JS-ключ ← намеренно
  session_state: text('session_state'), // snake_case JS-ключ ← намеренно
});
```

Если сделать все поля camelCase — адаптер молча запишет NULL в OAuth-поля. Refresh токены не сохранятся.

### 2. Таблица `verification_tokens` — колонка называется `identifier`, не `email`

Адаптер использует имя `identifier` в SQL-запросах (не `email`, не `emailAddress`):

```typescript
// ✅ Правильно
export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(), // ← обязательно 'identifier'
  token: text('token').notNull(),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
});
```

Если назвать `email` — magic link упадёт с `NeonDbError: column does not exist` при попытке использовать токен.

### 3. Таблица `verification_tokens` — колонка `expires`, не `expires_at`

Адаптер пишет `returning "identifier", "token", "expires"` — без суффикса `_at`:

```typescript
// ✅ Правильно
expires: timestamp('expires', { withTimezone: true }).notNull();

// ❌ Неправильно — адаптер не найдёт колонку
expiresAt: timestamp('expires_at', { withTimezone: true }).notNull();
```

### 4. ESLint — использовать `eslint-plugin-import-x`, не `eslint-plugin-import`

Оригинальный `eslint-plugin-import` несовместим с ESLint 10:

- Падает с `getTokenOrCommentBefore is not a function` при любом нарушении `import/order`
- Форк `eslint-plugin-import-x` — drop-in замена, поддерживает ESLint 10

```typescript
// eslint.config.js
import importX from 'eslint-plugin-import-x';

// Правила используют префикс import-x/
'import-x/order': ['error', { ... }]
```

### 5. DATABASE_URL валидация — не использовать z.string().url()

`z.string().url()` использует браузерный URL-парсер, который нестабильно работает
с `postgresql://` схемой в разных окружениях:

```typescript
// ✅ Правильно
DATABASE_URL: z.string().min(10),

// ❌ Может падать в CI/production
DATABASE_URL: z.string().url(),
```

### 6. JWT callbacks — user.id не добавляется в session автоматически

Auth.js v5 по умолчанию НЕ кладёт `user.id` в session. Без явных callbacks
`session.user.id` будет `undefined` везде — в Server Components и Server Actions:

```typescript
// auth.config.ts — обязательно:
callbacks: {
  jwt: ({ token, user }) => {
    if (user) token.id = user.id;
    return token;
  },
  session: ({ session, token }) => {
    if (session.user && token.id) {
      session.user.id = token.id as string;
    }
    return session;
  },
},
```

Без этого все Server Actions не смогут привязать данные к пользователю.

11 tables:

- **Auth**: `users`, `accounts`, `sessions`, `verification_tokens`, `auth_tokens`
- **Domain**: `companies`, `interviews`, `questions`, `contacts`, `events`

Key decisions:

- **UUIDs** for all primary keys (not serial)
- **snake_case** column names (DB native, easier for future Go service)
- **Postgres native enums** for stages/types/categories (not TEXT + CHECK)
- **TIMESTAMPTZ** everywhere (with timezone)
- **Soft delete** only for `companies` (`deleted_at` column)
- **Fractional indexing** for kanban order (`companies.position_order` is TEXT,
  not INTEGER) — uses `fractional-indexing` library
- **Full-text search** for `questions.text + answer` via `tsvector` GENERATED column
- **Triggers** for auto-update of `updated_at`
- **Denormalized `user_id`** in interviews/questions for query speed
- **Constraints at DB level** (CHECK, NOT NULL, FK with explicit ON DELETE)

Cascade strategy:

- Delete user → cascade everything (GDPR)
- Delete company → cascade interviews, questions, contacts, events
- Delete interview → cascade questions
- Companies are soft-deleted by default (set `deleted_at`)

## Auth Strategy

- **Auth.js v5** with built-in JWT strategy (`strategy: 'jwt'`)
- **HTTP-only secure cookies**, never localStorage
- **30-day TTL** with sliding expiration (24h `updateAge`)
- **Providers**: Google OAuth + Magic link (Resend)
- **`tokens_version`** column in users for force-logout capability
- **`auth_tokens`** table reserved for future refresh-token implementation
  (empty in MVP)

### Three-Layer Route Protection

1. **`middleware.ts`** — redirects unauthenticated users away from protected routes
2. **Server Components** — verify session before rendering data
3. **Server Actions** — verify session before any mutation

All three are required. Middleware can be bypassed by direct Server Action calls.

## Design System

### Colors (CSS variables in `globals.css`)

We use CSS custom properties as design tokens. Never hardcode hex values
in components. Use either Tailwind classes (mapped to vars) or
`var(--color-name)` directly.

Background scale: `--color-background`, `--color-surface`, `--color-surface-subtle`, `--color-surface-glass`
Text scale: `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`, `--color-text-quaternary`, `--color-text-inverse`
Accent: `--color-accent` (Apple system blue `#007AFF`), `--color-accent-hover`, `--color-accent-subtle`
Semantic: success/warning/danger/info/neutral with `-bg` and `-text` variants
Stage-specific: `--stage-{wishlist|applied|hr-screen|tech-round|final|offer|rejected}-{bg|text}`

### Typography

Font: **Geist** (loaded via Google Fonts). Fallback: -apple-system, BlinkMacSystemFont, etc.

Type scale (Apple HIG-aligned, NOT round numbers):

- 11px / 13px / 15px / 18px / 22px / 32px / 44px / 56px

Weights: only 300, 400, 500, 600. Never 700+.

### Radii

Continuous corner illusion via larger radii than typical:
8px / 12px / 16px / 20px / 24px

### Spacing

4px-grid: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128

### Animations

Spring transitions for most interactions:
`cubic-bezier(0.34, 1.56, 0.64, 1)` for spring
`cubic-bezier(0.4, 0, 0.2, 1)` for standard

### Liquid Glass

Apply ONLY to navigation, overlays, and floating elements:

- App header, sidebar (when floating)
- Cmd+K palette
- Modals, dropdowns, popovers
- Toasts

NEVER on dense content surfaces (cards on kanban, dashboard metrics, forms).

## Localization

MVP: Russian only.

### Rules

- All user-facing strings live in `strings.ts` files next to features/entities
- Date formatting: `date-fns` with `ru` locale always
- Number/currency formatting: `Intl.NumberFormat('ru-RU', ...)`
- Never write strings inline in JSX, even short ones like "ОК"

Example:

```ts
// features/company-create/model/strings.ts
export const COMPANY_CREATE_STRINGS = {
  buttonLabel: 'Добавить компанию',
  dialogTitle: 'Новая компания',
  fields: {
    name: 'Название компании',
    position: 'Должность',
    salary: 'Зарплатная вилка',
  },
  errors: {
    nameRequired: 'Введите название компании',
  },
} as const;
```

When v1.1 i18n is added, these constants will be replaced with `t('key')` calls.

## Server Actions Pattern

Every Server Action must:

1. Start with `'use server'` directive
2. Validate input via Zod
3. Verify auth session
4. Use `server-action-handler` wrapper from `@/shared/api/server-action-handler`
5. Revalidate relevant paths/tags after mutation

Template:

```ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { serverActionHandler } from '@/shared/api/server-action-handler';
import { requireAuth } from '@/shared/auth/session';
import { db } from '@/db/client';

const inputSchema = z.object({
  name: z.string().min(1).max(100),
  // ...
});

export const createCompany = serverActionHandler(inputSchema, async (input) => {
  const session = await requireAuth();

  const [company] = await db
    .insert(companies)
    .values({
      ...input,
      userId: session.user.id,
    })
    .returning();

  revalidatePath('/kanban');
  return { company };
});
```

## TanStack Query Pattern

Use TanStack Query for all data reads. Never `useEffect + fetch`.

Query keys should be typed and centralized per entity:

```ts
// entities/company/api/keys.ts
export const companyKeys = {
  all: ['companies'] as const,
  lists: () => [...companyKeys.all, 'list'] as const,
  list: (filters: CompanyFilters) => [...companyKeys.lists(), filters] as const,
  detail: (id: string) => [...companyKeys.all, 'detail', id] as const,
};
```

For mutations through Server Actions, invalidate after success:

```ts
const mutation = useMutation({
  mutationFn: createCompany,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
  },
});
```

## Performance & Optimization Rules

- **Don't use Playwright MCP for every UI check.** Use it for end-of-day
  smoke tests or specific debug scenarios. It eats tokens.
- **Don't ask Claude to scan the entire project before answering.** Point
  to specific files when possible.
- **Use Drizzle Studio (`pnpm db:studio`) for DB inspection** instead of
  Postgres MCP, when possible. MCP is for cases where you need to query.
- **Don't generate boilerplate I can write in 30 seconds.** Use Claude
  for non-trivial logic, refactors, debugging.

## Out of Scope (MVP)

These are NOT part of MVP. Don't implement them unless explicitly asked:

- Internationalization framework (next-intl) — Russian-only for now
- Email notifications / cron jobs — UI-based reminders only
- Browser extension
- Mobile app / PWA
- AI assistant features
- Multi-user / teams / workspaces
- Refresh token rotation (placeholder table exists)
- Custom kanban columns (stages are enum, not editable)

## Reference Documents

When in doubt about decisions, ask the user. Major architectural decisions
are documented in commit messages and ADRs (if added later).
