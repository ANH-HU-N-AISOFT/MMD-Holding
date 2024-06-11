import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { getAppointments } from '../services/getAppointments';

interface Props {
  studentId: string;
}

export const useGetAppointmentsOfStudent = ({ studentId }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { loading, data, run } = useRequest(getAppointments, { manual: true });

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
      studentId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, studentId]);

  return {
    loading,
    data,
    page,
    changePage: handleChangePage,
    search,
    changeSearch: handleSearch,
  };
};
