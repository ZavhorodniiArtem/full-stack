import { Key } from 'react';

export interface UserModalProps {
  isEdit?: boolean;
  isOpen: boolean;
  handleClose: () => void;
}

export interface UserBody {
  name: string;
  email: string;
}

export interface UserParams {
  search?: string;
  order?: string;
  field?: Key | readonly Key[];
  pageSize?: string;
  page?: number;
}
