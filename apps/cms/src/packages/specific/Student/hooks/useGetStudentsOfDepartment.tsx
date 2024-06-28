import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { getStudents } from '../services/getStudents';

interface Props {
  departmentCode: string;
}

export const useGetStudentsOfDepartment = ({ departmentCode }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { loading, data, run } = useRequest(getStudents, { manual: true });

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
      orgCodes: departmentCode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, departmentCode]);

  return {
    loading,
    data,
    page,
    changePage: handleChangePage,
    search,
    changeSearch: handleSearch,
  };
};
