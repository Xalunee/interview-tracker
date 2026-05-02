import { getCompaniesByUser } from '@/entities/company/api/queries';
import type { Company } from '@/entities/company/model/types';
import type { CompanyCard } from '@/entities/company/model/types';

export type KanbanData = Record<Company['status'], CompanyCard[]>;

export async function getKanbanData(userId: string): Promise<KanbanData> {
  const all = await getCompaniesByUser(userId);

  const grouped: KanbanData = {
    wishlist: [],
    applied: [],
    hr_screen: [],
    tech_round: [],
    final: [],
    offer: [],
    rejected: [],
  };

  for (const card of all) {
    grouped[card.status].push(card);
  }

  return grouped;
}
