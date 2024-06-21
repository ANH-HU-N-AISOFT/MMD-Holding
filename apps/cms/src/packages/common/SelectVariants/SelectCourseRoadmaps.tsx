import { useTranslation } from 'react-i18next';
import { CourseStatus } from './CourseStatus/constants/CourseStatus';
import {
  SelectMultipleDecoupling,
  SelectMultipleDecouplingProps,
} from '~/components/SelectDecoupling/SelectMultipleDecoupling';
import { GetAllParams } from '~/constants/GetAllParams';
import { CourseRoadmap } from '~/packages/specific/CourseRoadmap/models/CourseRoadmap';
import { getCourseRoadmaps } from '~/packages/specific/CourseRoadmap/services/getCourseRoadmaps';

interface Props {
  courseRoadmaps?: Array<CourseRoadmap['id']>;
  onChange?: SelectMultipleDecouplingProps<CourseRoadmap, Array<CourseRoadmap['id']>>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  label?: (courseRoadmap: CourseRoadmap) => string;
}

export const SelectCourseRoadmaps = ({
  disabled,
  courseRoadmaps,
  allowClear = true,
  placeholder,
  onChange,
  label,
}: Props) => {
  const { t } = useTranslation(['course_roadmap']);

  return (
    <SelectMultipleDecoupling<CourseRoadmap, Array<CourseRoadmap['id']>>
      allowClear={allowClear}
      placeholder={placeholder ?? t('course_roadmap:course_roadmap')}
      disabled={disabled}
      value={courseRoadmaps}
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
        const display = label ? label(courseRoadmap) : courseRoadmap['name'];
        return {
          label: display,
          searchValue: display,
          value: courseRoadmap['id'],
          rawData: courseRoadmap,
        };
      }}
      className="w-full"
    />
  );
};
