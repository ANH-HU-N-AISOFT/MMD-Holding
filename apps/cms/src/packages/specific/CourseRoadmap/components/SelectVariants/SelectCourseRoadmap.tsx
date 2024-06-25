import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { SelectSingleDecoupling, SelectSingleDecouplingProps } from 'reactjs';
import { CourseStatus } from '../../../../common/SelectVariants/CourseStatus/constants/CourseStatus';
import { GetAllParams } from '~/constants/GetAllParams';
import { CourseRoadmap } from '~/packages/specific/CourseRoadmap/models/CourseRoadmap';
import { getCourseRoadmaps } from '~/packages/specific/CourseRoadmap/services/getCourseRoadmaps';

interface Props {
  courseRoadmap?: CourseRoadmap['id'];
  onChange?: SelectSingleDecouplingProps<CourseRoadmap, CourseRoadmap['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  className?: string;
}

export const SelectCourseRoadmap = ({
  disabled,
  courseRoadmap,
  allowClear = true,
  placeholder,
  onChange,
  className,
}: Props) => {
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
      className={classNames('w-full', className)}
    />
  );
};
