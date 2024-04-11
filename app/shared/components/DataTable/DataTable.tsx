import { Button, Flex, Table, TableProps } from 'antd';
import { sorting } from '@/app/shared/helpers/sorting';
import { Key, useState } from 'react';
import { ColumnResponses, CustomTableProps, DataResponses } from './types';

const DataTable = <T extends DataResponses, C extends ColumnResponses>({
  data,
  isLoading,
  error,
  deleteMany,
  mutateFilters,
  columns,
}: CustomTableProps<T, C>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onChange: TableProps['onChange'] = (pagination, _filters, sorter) => {
    mutateFilters({
      sort: sorting(sorter),
      search: data?.search,
      page: pagination.current || data?.page,
      pageSize: `${pagination.pageSize || 10}`,
    });
  };

  const deleteSelected = () => {
    deleteMany(selectedRowKeys);
  };

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  if (error) return 'Something wrong...';

  return (
    <>
      <Flex style={{ marginBottom: '8px' }}>
        <Button
          danger
          onClick={deleteSelected}
          disabled={!selectedRowKeys.length}
        >
          Delete
        </Button>
      </Flex>

      <Table
        rowKey={({ id }) => `${id}`}
        dataSource={data?.data}
        columns={columns}
        loading={isLoading}
        onChange={onChange}
        pagination={{
          total: data?.total,
          pageSize: data?.pageSize,
          position: ['bottomCenter'],
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
      />
    </>
  );
};

export default DataTable;
