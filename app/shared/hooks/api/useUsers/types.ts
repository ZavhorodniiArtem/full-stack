import { Key } from 'react';

export interface Sort {
  order: string | null;
  field?: Key | readonly Key[];
}

export interface Filters {
  sort?: Sort | null;
  search?: string | null;
  pageSize?: string | null;
  page?: number;
}

export interface IUser {
  id: number | string;
  name: string;
  email: string;
  created_at: string;
  password: string | null;
}

export interface UserResponse {
  data: IUser[];
  pageSize: number;
  page: number;
  total: number;
  totalPages: number;
  search: string | null;
  sort: Sort;
}
