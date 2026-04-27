import { pgTable, text, timestamp, index } from 'drizzle-orm/pg-core';
import { v4 } from 'uuid';
import { users } from './auth';
import { companies } from './companies';
import { eventTypeEnum } from './enums';

export const events = pgTable(
  'events',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => v4()),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    companyId: text('company_id')
      .notNull()
      .references(() => companies.id, { onDelete: 'cascade' }),
    type: eventTypeEnum('type').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    scheduledAt: timestamp('scheduled_at', { mode: 'date', withTimezone: true }),
    completedAt: timestamp('completed_at', { mode: 'date', withTimezone: true }),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('events_user_id_idx').on(table.userId),
    companyIdIdx: index('events_company_id_idx').on(table.companyId),
    typeIdx: index('events_type_idx').on(table.type),
  }),
);
