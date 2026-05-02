import { pgEnum } from 'drizzle-orm/pg-core';

export const interviewStageEnum = pgEnum('interview_stage', [
  'wishlist',
  'applied',
  'hr_screen',
  'tech_round',
  'final',
  'offer',
  'rejected',
]);

export const companySourceEnum = pgEnum('company_source', [
  'hh',
  'linkedin',
  'referral',
  'telegram',
  'company_site',
  'other',
]);

export const salaryCurrencyEnum = pgEnum('salary_currency', [
  'RUB',
  'USD',
  'EUR',
  'KZT',
  'AMD',
  'GEL',
]);

export const interviewTypeEnum = pgEnum('interview_type', [
  'phone_screen',
  'technical',
  'system_design',
  'behavioral',
  'culture_fit',
  'final',
]);

export const questionCategoryEnum = pgEnum('question_category', [
  'data_structures',
  'algorithms',
  'system_design',
  'behavioral',
  'project_experience',
  'technical_depth',
  'other',
]);

export const eventTypeEnum = pgEnum('event_type', [
  'interview',
  'follow_up',
  'offer_received',
  'rejection',
  'other',
]);
