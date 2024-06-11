import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { getEmployees } from '../services/getEmployees';

interface Props {
  departmentId: string;
}

export const useGetEmployeesOfDepartment = ({ departmentId }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { loading, data, run } = useRequest(getEmployees, { manual: true });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handleChangePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    run({
      query: search,
      page,
      perPage: 8,
      sortByName: -1,
      organizationId: departmentId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, departmentId]);

  return {
    loading,
    data,
    page,
    changePage: handleChangePage,
    search,
    changeSearch: handleSearch,
  };
};
