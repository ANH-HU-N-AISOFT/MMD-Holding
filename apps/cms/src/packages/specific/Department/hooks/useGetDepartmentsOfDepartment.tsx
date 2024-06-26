import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { getDepartments } from '../services/getDepartments';

interface Props {
  departmentId: string;
}

export const useGetDepartmentsOfDepartment = ({ departmentId }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { loading, data, run } = useRequest(getDepartments, { manual: true });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handleChangePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    run({
      withoutPermission: false,
      query: search,
      page,
      perPage: 8,
      sortByName: -1,
      parentOrganizationId: departmentId,
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
