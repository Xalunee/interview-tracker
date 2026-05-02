export const companyKeys = {
  all: ['companies'] as const,
  lists: () => [...companyKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...companyKeys.lists(), filters] as const,
  detail: (id: string) => [...companyKeys.all, 'detail', id] as const,
};
