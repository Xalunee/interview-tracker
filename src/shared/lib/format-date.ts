import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export function formatDate(date: Date): string {
  return format(date, 'd MMMM yyyy', { locale: ru });
}

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { locale: ru, addSuffix: true });
}
