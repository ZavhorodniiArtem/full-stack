'use client';

import {
  useFetchFilteredLessons,
  useFetchLessons,
  useRemoveManyLessons,
} from '@/app/shared/hooks/api/useLessons/queries';
import MainSection from '@/app/(pages)/lessons/components/MainSection';
import DataTable from '@/app/shared/components/DataTable';
import { columnsLessons } from '@/app/(pages)/lessons/components/TableColumns/columns';

export default function Lessons() {
  const { data, error, isLoading } = useFetchLessons();
  const { mutate } = useFetchFilteredLessons();
  const { mutate: deleteMany } = useRemoveManyLessons();

  return (
    <>
      <MainSection />

      <h3 style={{ margin: '24px 0' }}>Lessons</h3>

      <DataTable
        data={data}
        columns={columnsLessons}
        isLoading={isLoading}
        error={error}
        mutateFilters={mutate}
        deleteMany={deleteMany}
      />
    </>
  );
}
