import { useTranslation } from 'react-i18next';
import { CourseStatus } from './CourseStatus/constants/CourseStatus';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
import { GetAllParams } from '~/constants/GetAllParams';
import { CourseRoadmap } from '~/packages/specific/CourseRoadmap/models/CourseRoadmap';
import { getCourseRoadmaps } from '~/packages/specific/CourseRoadmap/services/getCourseRoadmaps';

interface Props {
  courseRoadmap?: CourseRoadmap['id'];
  onChange?: SelectSingleDecouplingProps<CourseRoadmap, CourseRoadmap['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectCourseRoadmap = ({ disabled, courseRoadmap, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['course_roadmap']);

  return (
    <SelectSingleDecoupling<CourseRoadmap, CourseRoadmap['id']>
      allowClear={allowClear}
      placeholder={placeholder ?? t('course_roadmap:course_roadmap')}
      disabled={disabled}
      value={courseRoadmap}
      onChange={onChange}
      service={async () => {
        const response = await getCourseRoadmaps({
          ...GetAllParams,
          sortByName: 1,
          status: CourseStatus.ACTIVE,
        });
        return response.items;
      }}
      transformToOption={courseRoadmap => {
        return {
          label: courseRoadmap['name'],
          searchValue: courseRoadmap['name'],
          value: courseRoadmap['id'],
          rawData: courseRoadmap,
        };
      }}
      className="w-full"
    />
  );
};
