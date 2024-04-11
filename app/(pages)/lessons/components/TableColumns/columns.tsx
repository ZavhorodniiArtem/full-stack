'use client';

import { ColumnType } from 'antd/es/table';
import { ILessons } from '@/app/shared/hooks/api/useLessons/types';
import { LessonsContextProvider } from '@/app/(pages)/lessons/context/LessonsContext';
import Actions from '../Actions';
import VideoModal from '@/app/(pages)/lessons/components/VideoModal';

export const columnsLessons: ColumnType<ILessons>[] = [
  { title: 'ID', key: 'id', dataIndex: 'id', sorter: true },
  { title: 'Author', key: 'author', dataIndex: 'author', sorter: true },
  { title: 'Title', key: 'title', dataIndex: 'title', sorter: true },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
    sorter: true,
  },
  { title: 'Likes', key: 'likes', dataIndex: 'likes', sorter: true },
  {
    title: 'Link',
    key: 'link',
    dataIndex: 'link',
    sorter: true,
    render: (_, record) => (
      <VideoModal link={record.link} title={record.title} key={record.id} />
    ),
  },
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
      <LessonsContextProvider lessons={record} key={record.id}>
        <Actions />
      </LessonsContextProvider>
    ),
  },
];
