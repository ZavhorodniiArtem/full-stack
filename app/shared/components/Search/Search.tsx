import { Input } from 'antd';
import { debounce } from 'next/dist/server/utils';
import { setSort } from '@/app/shared/helpers/sorting';
import {
  DataResponse,
  SearchProps,
} from '@/app/shared/components/Search/types';

const Search = <T extends DataResponse>({
  data,
  mutateFilters,
}: SearchProps<T>) => {
  const handleSearch = debounce((term: string) => {
    mutateFilters({
      search: term,
      page: data?.page,
      pageSize: `${data?.pageSize}`,
      sort: setSort(data?.sort),
    });
  }, 1000);

  return (
    <Input
      placeholder='Search'
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};
export default Search;
