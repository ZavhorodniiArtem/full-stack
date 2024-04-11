import { Filters } from '@/app/shared/hooks/api/useUsers/types';

export const setParams = (filters?: Filters) => {
  return {
    search: filters?.search || '',
    order: filters?.sort?.order || 'desc',
    field: filters?.sort?.field || 'id',
    pageSize: filters?.pageSize || '10',
    page: filters?.page || 1,
  };
};
