import { SorterResult } from 'antd/es/table/interface';
import { Sort } from '@/app/shared/hooks/api/useUsers/types';

export const sorting = (sorter: SorterResult<Sort> | SorterResult<Sort>[]) => {
  if ('field' in sorter) {
    return {
      order: sorter?.order === 'ascend' ? 'ASC' : 'DESC',
      field: sorter?.field,
    };
  }
  return null;
};

export const setSort = (sort?: Sort) => {
  if (!sort) return null;

  return {
    order: sort?.order,
    field: sort?.field,
  };
};
