import { z } from 'zod';

export const createCompanySchema = z
  .object({
    name: z.string().min(1, 'Введите название компании').max(100, 'Название слишком длинное'),
    position: z.string().min(1, 'Введите должность').max(100, 'Должность слишком длинная'),
    status: z
      .enum(['wishlist', 'applied', 'hr_screen', 'tech_round', 'final', 'offer', 'rejected'])
      .default('wishlist'),
    website: z.string().url('Введите корректный URL').optional().or(z.literal('')),
    jobUrl: z.string().url('Введите корректный URL').optional().or(z.literal('')),
    source: z.enum(['hh', 'linkedin', 'referral', 'telegram', 'company_site', 'other']).optional(),
    salaryMin: z.coerce.number().positive().optional(),
    salaryMax: z.coerce.number().positive().optional(),
    salaryCurrency: z.enum(['RUB', 'USD', 'EUR', 'KZT', 'AMD', 'GEL']).default('RUB'),
    techStack: z.string().optional(),
    notes: z.string().max(2000).optional(),
    priority: z.coerce.number().min(0).max(3).default(0),
  })
  .refine((data) => !data.salaryMin || !data.salaryMax || data.salaryMin <= data.salaryMax, {
    message: 'Минимальная зарплата не может быть больше максимальной',
    path: ['salaryMax'],
  });

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;
