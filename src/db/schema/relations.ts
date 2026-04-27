import { relations } from 'drizzle-orm';
import { users, accounts, sessions } from './auth';
import { companies } from './companies';
import { interviews } from './interviews';
import { questions } from './questions';
import { contacts } from './contacts';
import { events } from './events';

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  companies: many(companies),
  interviews: many(interviews),
  questions: many(questions),
  contacts: many(contacts),
  events: many(events),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const companiesRelations = relations(companies, ({ one, many }) => ({
  user: one(users, { fields: [companies.userId], references: [users.id] }),
  interviews: many(interviews),
  contacts: many(contacts),
  events: many(events),
}));

export const interviewsRelations = relations(interviews, ({ one, many }) => ({
  user: one(users, { fields: [interviews.userId], references: [users.id] }),
  company: one(companies, { fields: [interviews.companyId], references: [companies.id] }),
  questions: many(questions),
}));

export const questionsRelations = relations(questions, ({ one }) => ({
  user: one(users, { fields: [questions.userId], references: [users.id] }),
  interview: one(interviews, { fields: [questions.interviewId], references: [interviews.id] }),
}));

export const contactsRelations = relations(contacts, ({ one }) => ({
  user: one(users, { fields: [contacts.userId], references: [users.id] }),
  company: one(companies, { fields: [contacts.companyId], references: [companies.id] }),
}));

export const eventsRelations = relations(events, ({ one }) => ({
  user: one(users, { fields: [events.userId], references: [users.id] }),
  company: one(companies, { fields: [events.companyId], references: [companies.id] }),
}));
