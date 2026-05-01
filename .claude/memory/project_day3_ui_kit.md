---
name: Day 3 — UI Kit and App Layout
description: What was built on Day 3: shadcn components, providers, theme toggle, user entity, header/sidebar widgets, app layout
type: project
---

Day 3 complete. All commits on `main`.

**Key decisions and quirks discovered:**

1. **Tailwind v3 vs v4**: globals.css used `@theme` (Tailwind v4 syntax) but Tailwind v3 was installed — CSS vars were silently not applying. Fixed by replacing `@theme` with `:root` and dark mode from `@media (prefers-color-scheme: dark) { @theme }` to `.dark {}`.

2. **Dark mode strategy**: Using `attribute="class"` in ThemeProvider (not `data-theme`). Tailwind `darkMode: ['class']`. This is the standard shadcn approach. The `.dark` class is placed on `<html>` by next-themes.

3. **ThemeToggle hydration mismatch**: `useTheme()` returns `undefined` on server — different SVG icon paths cause hydration error. Fix: `mounted` state guard — render `Monitor` icon on server/first-render, switch to actual theme icon after `useEffect`.

4. **exactOptionalPropertyTypes recurring pattern**: When passing `user?.name` (which can be `string | null | undefined`) to props typed as `string | null`, use `?? null` to collapse undefined. Pattern: `name={user?.name ?? null}`.

5. **shadcn components installed**: button, input, label, dialog, dropdown-menu, select, popover, tooltip, badge, card, skeleton, separator, tabs, command, avatar, scroll-area, sheet, textarea, switch, sonner — all in `src/shared/ui/`.

6. **LogoutButton variant**: Added `variant="menu-item"` to LogoutButton for use inside DropdownMenu. Default variant stays the same (standalone button on dashboard).

7. **SidebarFooter client split**: `'use client'` must be a file-level directive. Extracted `SidebarFooter` to its own file since it uses `useCurrentUser` hook.

**What's next (Day 4)**: Companies entity and Kanban board.
