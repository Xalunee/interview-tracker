import type { Company } from './types';

export type StageConfig = {
  value: Company['status'];
  label: string;
  bgVar: string;
  textVar: string;
  order: number;
};

export const STAGE_CONFIG: Record<Company['status'], StageConfig> = {
  wishlist: {
    value: 'wishlist',
    label: 'Вишлист',
    bgVar: 'var(--stage-wishlist-bg)',
    textVar: 'var(--stage-wishlist-text)',
    order: 0,
  },
  applied: {
    value: 'applied',
    label: 'Откликнулся',
    bgVar: 'var(--stage-applied-bg)',
    textVar: 'var(--stage-applied-text)',
    order: 1,
  },
  hr_screen: {
    value: 'hr_screen',
    label: 'HR-скрин',
    bgVar: 'var(--stage-hr-screen-bg)',
    textVar: 'var(--stage-hr-screen-text)',
    order: 2,
  },
  tech_round: {
    value: 'tech_round',
    label: 'Тех. раунд',
    bgVar: 'var(--stage-tech-round-bg)',
    textVar: 'var(--stage-tech-round-text)',
    order: 3,
  },
  final: {
    value: 'final',
    label: 'Финал',
    bgVar: 'var(--stage-final-bg)',
    textVar: 'var(--stage-final-text)',
    order: 4,
  },
  offer: {
    value: 'offer',
    label: 'Оффер',
    bgVar: 'var(--stage-offer-bg)',
    textVar: 'var(--stage-offer-text)',
    order: 5,
  },
  rejected: {
    value: 'rejected',
    label: 'Отказ',
    bgVar: 'var(--stage-rejected-bg)',
    textVar: 'var(--stage-rejected-text)',
    order: 6,
  },
};

export const STAGES_ORDERED = Object.values(STAGE_CONFIG).sort((a, b) => a.order - b.order);
