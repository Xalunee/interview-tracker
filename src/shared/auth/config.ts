import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';

import { db } from '@/db/client';
import { accounts, sessions, users, verificationTokens } from '@/db/schema/auth';
import { env } from '@/shared/config';

import {
  MAGIC_LINK_SUBJECT,
  buildMagicLinkEmailHtml,
  buildMagicLinkEmailText,
} from './email-templates';

const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days
const SESSION_UPDATE_AGE_SECONDS = 24 * 60 * 60; // 24 hours

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: 'jwt',
    maxAge: SESSION_MAX_AGE_SECONDS,
    updateAge: SESSION_UPDATE_AGE_SECONDS,
  },
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
    Resend({
      apiKey: env.AUTH_RESEND_KEY,
      from: env.AUTH_EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${provider.apiKey as string}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: provider.from,
            to: identifier,
            subject: MAGIC_LINK_SUBJECT,
            html: buildMagicLinkEmailHtml({ url }),
            text: buildMagicLinkEmailText({ url }),
          }),
        });

        if (!res.ok) {
          const body = await res.text();
          console.error('[auth][resend] failed to send magic link', res.status, body);
          throw new Error(`Resend API error: ${res.status}`);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/verify',
    error: '/login',
  },
  callbacks: {
    signIn: ({ user }) => {
      return Boolean(user.email);
    },
    jwt: ({ token, user }) => {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user && typeof token.id === 'string') {
        session.user.id = token.id;
      }
      return session;
    },
  },
  trustHost: true,
  secret: env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
