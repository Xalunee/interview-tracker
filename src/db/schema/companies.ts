import { pgTable, text, timestamp, index } from 'drizzle-orm/pg-core';
import { v4 } from 'uuid';
import { users } from './auth';

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
    website: text('website'),
    logo: text('logo'),
    position: text('position'),
    salary: text('salary'),
    notes: text('notes'),
    positionOrder: text('position_order'),
    deletedAt: timestamp('deleted_at', { mode: 'date', withTimezone: true }),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('companies_user_id_idx').on(table.userId),
    deletedAtIdx: index('companies_deleted_at_idx').on(table.deletedAt),
  }),
);
