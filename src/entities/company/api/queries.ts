import 'server-only';
import { and, asc, eq, isNull } from 'drizzle-orm';
import { db } from '@/db/client';
import { companies } from '@/db/schema';
import type { Company, CompanyCard } from '../model/types';

const CARD_COLUMNS = {
  id: companies.id,
  name: companies.name,
  position: companies.position,
  status: companies.status,
  logoUrl: companies.logoUrl,
  salaryMin: companies.salaryMin,
  salaryMax: companies.salaryMax,
  salaryCurrency: companies.salaryCurrency,
  techStack: companies.techStack,
  priority: companies.priority,
  positionOrder: companies.positionOrder,
  lastActivityAt: companies.lastActivityAt,
  createdAt: companies.createdAt,
} as const;

export async function getCompaniesByUser(userId: string): Promise<CompanyCard[]> {
  return db
    .select(CARD_COLUMNS)
    .from(companies)
    .where(and(eq(companies.userId, userId), isNull(companies.deletedAt)))
    .orderBy(asc(companies.status), asc(companies.positionOrder));
}

export async function getCompaniesByStatus(
  userId: string,
  status: Company['status'],
): Promise<CompanyCard[]> {
  return db
    .select(CARD_COLUMNS)
    .from(companies)
    .where(
      and(eq(companies.userId, userId), eq(companies.status, status), isNull(companies.deletedAt)),
    )
    .orderBy(asc(companies.positionOrder));
}

export async function getCompanyById(id: string, userId: string): Promise<Company | null> {
  const rows = await db
    .select()
    .from(companies)
    .where(and(eq(companies.id, id), eq(companies.userId, userId), isNull(companies.deletedAt)))
    .limit(1);

  return rows[0] ?? null;
}
