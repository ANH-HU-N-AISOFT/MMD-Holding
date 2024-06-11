import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { CourseRoadmap } from '../models/CourseRoadmap';
import { getCourseRoadmaps } from '../services/getCourseRoadmaps';

interface Props {
  courseId?: CourseRoadmap['courseId'];
}

export const useGetRoadMapsOfCourse = ({ courseId }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { loading, data, run } = useRequest(getCourseRoadmaps, { manual: true });

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
      sortByName: -1,
      courseId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, courseId]);

  return {
    loading,
    data,
    page,
    changePage: handleChangePage,
    search,
    changeSearch: handleSearch,
  };
};
