'use client';

import { ColumnType } from 'antd/es/table';
import { IUser } from '@/app/shared/hooks/api/useUsers/types';
import Actions from '@/app/(pages)/users/components/Actions';
import { UsersContextProvider } from '@/app/(pages)/users/context/UsersContext';

export const columnsUsers: ColumnType<IUser>[] = [
  { title: 'ID', key: 'id', dataIndex: 'id', sorter: true },
  { title: 'Name', key: 'name', dataIndex: 'name', sorter: true },
  { title: 'Email', key: 'email', dataIndex: 'email', sorter: true },
  {
    title: 'Created date',
    key: 'created_at',
    dataIndex: 'created_at',
    sorter: true,
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    align: 'right',
    render: (_, record) => (
      <UsersContextProvider user={record} key={record.id}>
        <Actions />
      </UsersContextProvider>
    ),
  },
];
