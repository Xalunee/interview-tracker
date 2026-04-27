# Interview Tracker

A personal job application tracker for senior developers. Track companies, interviews, questions, and job search progress in one place.

**Status:** Day 1 initialization complete. MVP development in progress.

## Tech Stack

- **Next.js 14** (App Router, Turbopack)
- **React 18** with Server Components & Server Actions
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (CSS-first with @theme)
- **Drizzle ORM** + **Neon PostgreSQL**
- **Auth.js v5** (JWT strategy)
- **TanStack Query v5** (server state)
- **Zustand** (client state)
- **React Hook Form** + **Zod** (form validation)
- **dnd-kit** + **fractional-indexing** (drag-drop kanban)
- **Vitest** + **Playwright** (testing)

## Features (MVP)

- [ ] Job application kanban board (wishlist → offer/rejected)
- [ ] Interview tracking (stage, type, feedback)
- [ ] Question bank (asked, answered, categories)
- [ ] Company profiles with contacts
- [ ] Event timeline (interviews, follow-ups, rejections)
- [ ] Full-text search on questions
- [ ] User authentication (Google OAuth, Magic link)

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database (Neon recommended)

### Local Setup

1. **Clone & install**

   ```bash
   git clone https://github.com/yourusername/interview-tracker.git
   cd interview-tracker
   pnpm install
   ```

2. **Setup database**
   - Create a free PostgreSQL database at [neon.tech](https://neon.tech)
   - Copy the connection string

3. **Configure environment**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your values:

   ```
   DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
   AUTH_SECRET="openssl rand -base64 32"  # Generate with: openssl rand -base64 32
   AUTH_URL="http://localhost:3000"
   AUTH_GOOGLE_ID="your-google-oauth-id"
   AUTH_GOOGLE_SECRET="your-google-oauth-secret"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_NAME="Interview Tracker"
   ```

4. **Apply migrations**

   ```bash
   pnpm db:migrate
   ```

5. **Start dev server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server (with Turbopack)
pnpm build            # Production build
pnpm start            # Start production server

# Code Quality
pnpm lint             # ESLint check
pnpm typecheck        # TypeScript check
pnpm format           # Prettier format
pnpm test             # Vitest (unit tests)
pnpm test:e2e         # Playwright (E2E tests)

# Database
pnpm db:generate      # Generate migrations from schema
pnpm db:migrate       # Apply pending migrations
pnpm db:studio        # Open Drizzle Studio UI
```

## Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── _providers/   # React providers
│   ├── _styles/      # Global styles + design tokens
│   ├── (auth)/       # Auth pages (public)
│   ├── (app)/        # Protected pages (kanban, dashboard, etc.)
│   └── api/auth/     # Auth.js route handler
├── widgets/          # Composed UI blocks (kanban-board, app-sidebar)
├── features/         # User actions (company-create, drag-drop)
├── entities/         # Business entities (company, interview, question)
├── shared/           # Reusable utilities & components
│   ├── ui/           # shadcn/ui copied components
│   ├── lib/          # Utilities (cn, cn.ts classname merger)
│   ├── config/       # Environment validation (Zod)
│   ├── auth/         # Auth utilities
│   ├── hooks/        # Custom React hooks
│   └── types/        # Shared TypeScript types
└── db/               # Drizzle ORM
    ├── schema/       # Database tables & relations
    └── migrations/   # SQL migrations
```

## Database Schema

11 tables:

- **Auth**: users, accounts, sessions, verification_tokens, auth_tokens
- **Domain**: companies (soft-delete), interviews, questions (full-text search), contacts, events

Features:

- UUIDs for all primary keys
- snake_case columns (PostgreSQL native)
- TIMESTAMPTZ with auto-updated `updated_at` via triggers
- Soft delete only for companies
- Fractional indexing for kanban column order
- Full-text search on questions (tsvector + GIN index)
- Cascade deletes: user → all, company → interviews/questions/contacts/events

## Development Notes

### Architecture

- **FSD** (Feature-Sliced Design) layer structure
- **Server Actions** for all mutations (no direct API calls)
- **Server Components** by default, Client Components for interactivity
- **TanStack Query** for server state, **Zustand** for UI state
- No localStorage — use server state + cookies

### Design System

- Tailwind v4 CSS-first with @theme in globals.css
- Apple HIG-aligned typography scale
- Liquid glass, continuous corner radius, spring animations
- Dark mode ready (via prefers-color-scheme)

### Type Safety

```bash
pnpm typecheck  # Always check before commit
```

- TypeScript strict + noUncheckedIndexedAccess + exactOptionalPropertyTypes
- Zod for runtime validation (env, forms, API inputs)

### Pre-commit Hooks

```bash
# Automatically runs on git commit
# → ESLint + Prettier (TypeScript files)
# → Prettier (JSON, CSS, Markdown)
# → Commitlint (message format: feat, fix, chore...)
```

## Roadmap

### Day 1 ✅

- [x] Next.js + TypeScript setup
- [x] Drizzle ORM + Neon database
- [x] ESLint + Prettier + Commitlint
- [x] GitHub Actions CI
- [x] FSD architecture structure
- [x] Design system (CSS tokens)

### Days 2–7 (MVP)

- [ ] Auth (Google OAuth + Magic link)
- [ ] Company CRUD
- [ ] Interview kanban board
- [ ] Questions bank
- [ ] Event timeline
- [ ] Full-text search

### Days 8–15 (Polish)

- [ ] UI components (shadcn)
- [ ] Form validation
- [ ] Error handling
- [ ] Loading states
- [ ] Mobile responsive
- [ ] Tests (Vitest + Playwright)

### Future (v1.1)

- [ ] Internationalization (English + Russian)
- [ ] Email notifications
- [ ] Browser extension
- [ ] Multi-user workspaces
- [ ] AI question suggestions

## Contributing

This is a personal portfolio project, but feel free to fork and customize!

## License

MIT

---

Built with ❤️ as a senior developer portfolio piece.
