import { pgTable, text, timestamp, index } from 'drizzle-orm/pg-core';
import { v4 } from 'uuid';
import { users } from './auth';
import { companies } from './companies';
import { interviewStageEnum, interviewTypeEnum } from './enums';

export const interviews = pgTable(
  'interviews',
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
    stage: interviewStageEnum('stage').default('applied').notNull(),
    type: interviewTypeEnum('type').notNull(),
    scheduledAt: timestamp('scheduled_at', { mode: 'date', withTimezone: true }),
    interviewerName: text('interviewer_name'),
    interviewerEmail: text('interviewer_email'),
    notes: text('notes'),
    feedback: text('feedback'),
    outcome: text('outcome'),
    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('interviews_user_id_idx').on(table.userId),
    companyIdIdx: index('interviews_company_id_idx').on(table.companyId),
    stageIdx: index('interviews_stage_idx').on(table.stage),
  }),
);
