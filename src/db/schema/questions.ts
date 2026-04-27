import { pgTable, text, timestamp, index } from 'drizzle-orm/pg-core';
import { v4 } from 'uuid';
import { users } from './auth';
import { interviews } from './interviews';
import { questionCategoryEnum } from './enums';

export const questions = pgTable(
  'questions',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => v4()),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    interviewId: text('interview_id')
      .notNull()
      .references(() => interviews.id, { onDelete: 'cascade' }),
    text: text('text').notNull(),
    answer: text('answer'),
    category: questionCategoryEnum('category').notNull(),
    difficulty: text('difficulty'),
    source: text('source'),
    notes: text('notes'),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('questions_user_id_idx').on(table.userId),
    interviewIdIdx: index('questions_interview_id_idx').on(table.interviewId),
    categoryIdx: index('questions_category_idx').on(table.category),
  }),
);
