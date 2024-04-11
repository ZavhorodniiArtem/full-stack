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

export interface LessonsParams {
  search?: string;
  order?: string;
  field?: Key | readonly Key[];
  pageSize?: string;
  page?: number;
}

export interface ILessons {
  id: number | string;
  author: string;
  link: string;
  title: string;
  description: string;
  created_at: string;
  likes: number;
}

export interface LessonsResponse {
  data: ILessons[];
  pageSize: number;
  page: number;
  total: number;
  totalPages: number;
  search: string | null;
  sort: Sort;
}
