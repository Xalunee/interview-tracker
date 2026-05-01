import { HelpCircle, Kanban, LayoutDashboard, Settings } from 'lucide-react';

export const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: 'Дашборд',
    icon: LayoutDashboard,
  },
  {
    href: '/kanban',
    label: 'Канбан',
    icon: Kanban,
  },
  {
    href: '/questions',
    label: 'Вопросы',
    icon: HelpCircle,
  },
  {
    href: '/settings',
    label: 'Настройки',
    icon: Settings,
  },
] as const;
