'use server';

import { generateKeyBetween } from 'fractional-indexing';
import { revalidatePath } from 'next/cache';
import { db } from '@/db/client';
import { companies } from '@/db/schema';
import { serverActionHandler } from '@/shared/api/server-action-handler';
import { requireAuth } from '@/shared/auth/session';
import { getCompaniesByStatus } from '@/entities/company/api/queries';
import { fetchLogo } from '@/entities/company/lib/fetch-logo';
import { createCompanySchema } from '../model/schema';

export const createCompany = serverActionHandler(createCompanySchema, async (input) => {
  const session = await requireAuth();
  const userId = session.user.id;

  const existingInStatus = await getCompaniesByStatus(userId, input.status);
  const lastPosition = existingInStatus.at(-1)?.positionOrder ?? null;
  const positionOrder = generateKeyBetween(lastPosition, null);

  const techStack = input.techStack
    ? input.techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  let logoUrl: string | null = null;
  if (input.website) {
    logoUrl = await fetchLogo(input.website);
  }

  const [company] = await db
    .insert(companies)
    .values({
      userId,
      name: input.name,
      position: input.position,
      status: input.status,
      website: input.website || null,
      jobUrl: input.jobUrl || null,
      source: input.source ?? null,
      salaryMin: input.salaryMin ?? null,
      salaryMax: input.salaryMax ?? null,
      salaryCurrency: input.salaryCurrency,
      techStack,
      logoUrl,
      notes: input.notes ?? null,
      priority: input.priority,
      positionOrder,
      lastActivityAt: new Date(),
    })
    .returning();

  revalidatePath('/kanban');
  revalidatePath('/dashboard');

  return { company };
});
