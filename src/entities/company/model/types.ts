import type { InferSelectModel } from 'drizzle-orm';
import type { companies } from '@/db/schema';

export type Company = InferSelectModel<typeof companies>;

export type CompanyCard = Pick<
  Company,
  | 'id'
  | 'name'
  | 'position'
  | 'status'
  | 'logoUrl'
  | 'salaryMin'
  | 'salaryMax'
  | 'salaryCurrency'
  | 'techStack'
  | 'priority'
  | 'positionOrder'
  | 'lastActivityAt'
  | 'createdAt'
>;

export type CreateCompanyInput = {
  name: string;
  position: string;
  status?: Company['status'];
  website?: string;
  jobUrl?: string;
  source?: Company['source'];
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: Company['salaryCurrency'];
  techStack?: string[];
  notes?: string;
  priority?: number;
};
