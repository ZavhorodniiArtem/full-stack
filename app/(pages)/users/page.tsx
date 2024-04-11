'use client';

import {
  useFetchFilteredUsers,
  useFetchUsers,
  useRemoveManyUsers,
} from '@/app/shared/hooks/api/useUsers/queries';
import MainSection from './components/MainSection';
import DataTable from '@/app/shared/components/DataTable';
import { columnsUsers } from '@/app/(pages)/users/components/TableColumns/columns';

export default function Users() {
  const { data, error, isLoading } = useFetchUsers();
  const { mutate } = useFetchFilteredUsers();
  const { mutate: deleteMany } = useRemoveManyUsers();

  return (
    <>
      <MainSection />

      <h3 style={{ margin: '24px 0' }}>Users table</h3>

      <DataTable
        data={data}
        columns={columnsUsers}
        isLoading={isLoading}
        error={error}
        mutateFilters={mutate}
        deleteMany={deleteMany}
      />
    </>
  );
}
