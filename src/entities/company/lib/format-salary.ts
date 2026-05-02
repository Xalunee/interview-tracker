const CURRENCY_SYMBOLS: Record<string, string> = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
  KZT: '₸',
  AMD: '֏',
  GEL: '₾',
};

export function formatSalary(
  min: number | null | undefined,
  max: number | null | undefined,
  currency: string,
): string | null {
  if (!min && !max) return null;

  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  const fmt = new Intl.NumberFormat('ru-RU');

  if (min && max) return `${fmt.format(min)} – ${fmt.format(max)} ${symbol}`;
  if (min) return `от ${fmt.format(min)} ${symbol}`;
  return `до ${fmt.format(max!)} ${symbol}`;
}
