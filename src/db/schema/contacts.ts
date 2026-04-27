import { pgTable, text, timestamp, index } from 'drizzle-orm/pg-core';
import { v4 } from 'uuid';
import { users } from './auth';
import { companies } from './companies';

export const contacts = pgTable(
  'contacts',
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
    name: text('name').notNull(),
    email: text('email'),
    phone: text('phone'),
    title: text('title'),
    linkedinUrl: text('linkedin_url'),
    notes: text('notes'),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('contacts_user_id_idx').on(table.userId),
    companyIdIdx: index('contacts_company_id_idx').on(table.companyId),
  }),
);
