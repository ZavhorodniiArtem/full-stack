import { Key } from 'react';

export interface LessonModalProps {
  isEdit?: boolean;
  isOpen: boolean;
  handleClose: () => void;
}

export interface LessonBody {
  author: string;
  title: string;
  description: string;
  link: string;
}

export interface UserParams {
  search?: string;
  order?: string;
  field?: Key | readonly Key[];
  pageSize?: string;
  page?: number;
}
