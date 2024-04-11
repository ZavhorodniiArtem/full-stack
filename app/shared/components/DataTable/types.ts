import { Key } from 'react';
import { ColumnType } from 'antd/es/table';
import {
  Filters,
  IUser,
  UserResponse,
} from '@/app/shared/hooks/api/useUsers/types';
import {
  ILessons,
  LessonsResponse,
} from '@/app/shared/hooks/api/useLessons/types';

export type DataResponses = LessonsResponse | UserResponse;
export type ColumnResponses = IUser | ILessons;

export interface CustomTableProps<T, C> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  deleteMany: (ids: Key[]) => void;
  mutateFilters: (filters: Filters) => void;
  columns: ColumnType<C>[];
}
