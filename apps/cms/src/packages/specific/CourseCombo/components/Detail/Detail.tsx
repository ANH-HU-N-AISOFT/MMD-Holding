import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CourseCombo } from '../../models/CourseCombo';
import { getDisplaySessionDuration } from '../../utils/getDisplaySessionDuration';
import { FormMutation } from '../FormMutation/FormMutation';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { FormSearchNFilter } from '~/packages/specific/CourseRoadmap/components/Listing/FormSearchNFilter';
import { Table } from '~/packages/specific/CourseRoadmap/components/Listing/Table';
import { CourseRoadmap } from '~/packages/specific/CourseRoadmap/models/CourseRoadmap';

interface Props {
  courseCombo: CourseCombo;
}

export const Detail = ({ courseCombo }: Props) => {
  const { t } = useTranslation(['course_combo']);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const courseRoadmaps = useMemo(() => {
    return courseCombo.courseRoadmap?.reduce<CourseRoadmap[]>((result, item) => {
      if (!search || (search && item.name.includes(search))) {
        return result.concat({
          code: item.code,
          name: item.name,
          numberSessions: item.numberSessions,
          price: item.price,
          sessionDuration: item.sessionDuration,
          notes: item.notes,
          courseId: '',
          id: item.id,
          status: item.status,
        });
      }
      return result;
    }, []);
  }, [search, courseCombo]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <FormMutation
          isSubmiting={false}
          uid=""
          disabled
          defaultValues={{
            description: courseCombo.notes,
            name: courseCombo.name,
            courseRoadmapIds: courseCombo.courseRoadmapIds,
            status: courseCombo.status,
            totalNumberSessions: courseCombo.totalNumberSessions,
            totalPrice: courseCombo.totalPrice,
            displayTotalSessionDuration: getDisplaySessionDuration({ courseRoadmaps: courseCombo.courseRoadmap }),
          }}
        />
      </div>
      <BoxFields
        title={
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>{t('course_combo:course_roadmaps')}</div>
            <div className="basis-[320px]">
              <FormSearchNFilter
                searchPlaceholder={t('course_combo:search_course_roadmaps_placeholder')}
                searchValue={search}
                onSearch={handleSearch}
                hideFilter
              />
            </div>
          </div>
        }
      >
        <Table
          hideColumnCourse
          paginationMode="none"
          currentPage={page}
          onChange={handleChangePage}
          pageSize={10}
          totalRecords={courseRoadmaps?.length ?? 0}
          dataSource={courseRoadmaps}
          onView={record => window.open(`/course-roadmap/${record.id}/detail`)}
        />
      </BoxFields>
    </div>
  );
};
