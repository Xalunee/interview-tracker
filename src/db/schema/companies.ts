import { pgTable, text, integer, timestamp, index } from 'drizzle-orm/pg-core';
import { v4 } from 'uuid';
import { users } from './auth';
import { interviewStageEnum, companySourceEnum, salaryCurrencyEnum } from './enums';

export const companies = pgTable(
  'companies',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => v4()),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    status: interviewStageEnum('status').notNull().default('wishlist'),
    website: text('website'),
    logoUrl: text('logo_url'),
    jobUrl: text('job_url'),
    source: companySourceEnum('source'),
    position: text('position'),
    salaryMin: integer('salary_min'),
    salaryMax: integer('salary_max'),
    salaryCurrency: salaryCurrencyEnum('salary_currency').notNull().default('RUB'),
    techStack: text('tech_stack').array(),
    notes: text('notes'),
    priority: integer('priority').notNull().default(0),
    positionOrder: text('position_order'),
    lastActivityAt: timestamp('last_activity_at', { mode: 'date', withTimezone: true }),
    deletedAt: timestamp('deleted_at', { mode: 'date', withTimezone: true }),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('companies_user_id_idx').on(table.userId),
    statusIdx: index('companies_status_idx').on(table.status),
    deletedAtIdx: index('companies_deleted_at_idx').on(table.deletedAt),
  }),
);
