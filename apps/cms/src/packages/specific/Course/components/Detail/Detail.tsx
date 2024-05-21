import { useTranslation } from 'react-i18next';
import { Course } from '../../models/Course';
import { FormMutation } from '../FormMutation/FormMutation';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { FormSearchNFilter } from '~/packages/specific/CourseRoadmap/components/Listing/FormSearchNFilter';
import { Table } from '~/packages/specific/CourseRoadmap/components/Listing/Table';
import { useGetRoadMaps } from '~/packages/specific/CourseRoadmap/hooks/useGetRoadMaps';

interface Props {
  course: Course;
}

export const Detail = ({ course }: Props) => {
  const { t } = useTranslation(['course']);

  const { data, loading, page, changePage, search, changeSearch } = useGetRoadMaps({ courseId: course.id });

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <FormMutation
          isSubmiting={false}
          uid=""
          disabled
          defaultValues={{
            description: course.notes,
            name: course.name,
            status: course.status,
          }}
        />
      </div>
      <BoxFields
        title={
          <div className="flex items-center gap-4 justify-between flex-wrap">
            <div>{t('course:course_roadmaps')}</div>
            <div className="basis-[300px]">
              <FormSearchNFilter
                searchPlaceholder={t('course:search_course_roadmaps_placeholder')}
                searchValue={search}
                onSearch={changeSearch}
                hideFilter
              />
            </div>
          </div>
        }
      >
        <Table
          paginationMode="none"
          currentPage={page}
          onChange={changePage}
          pageSize={data?.headers['x-per-page'] ?? 0}
          totalRecords={data?.headers['x-total-count'] ?? 0}
          loading={loading}
          dataSource={data?.items}
          deletable={false}
          editable={false}
          onView={record => window.open(`/course-roadmap/${record.id}/detail`)}
        />
      </BoxFields>
    </div>
  );
};
