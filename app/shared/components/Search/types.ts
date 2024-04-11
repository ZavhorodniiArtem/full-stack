import { LessonsResponse } from '@/app/shared/hooks/api/useLessons/types';
import { Filters, UserResponse } from '@/app/shared/hooks/api/useUsers/types';

export type DataResponse = LessonsResponse | UserResponse;

export interface SearchProps<T extends DataResponse> {
  data: T | undefined;
  mutateFilters: (filters: Filters) => void;
}
