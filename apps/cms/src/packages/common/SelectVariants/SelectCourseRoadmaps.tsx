import { useTranslation } from 'react-i18next';
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
}

export const SelectCourseRoadmaps = ({ disabled, courseRoadmaps, allowClear = true, placeholder, onChange }: Props) => {
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
