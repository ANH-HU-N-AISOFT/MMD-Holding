import { useTranslation } from 'react-i18next';
import { SelectSingleDecoupling, SelectSingleDecouplingProps } from 'reactjs';
import { CourseStatus } from '../../models/CourseStatus';
import { GetAllParams } from '~/constants/GetAllParams';
import { Course } from '~/packages/specific/Course/models/Course';
import { getCourses } from '~/packages/specific/Course/services/getCourses';

interface Props {
  course?: Course['id'];
  onChange?: SelectSingleDecouplingProps<Course, Course['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectCourse = ({ disabled, course, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['course']);

  return (
    <SelectSingleDecoupling<Course, Course['id']>
      allowClear={allowClear}
      placeholder={placeholder ?? t('course:course')}
      disabled={disabled}
      value={course}
      onChange={onChange}
      service={async () => {
        const response = await getCourses({
          ...GetAllParams,
          sortByName: 1,
          status: CourseStatus.ACTIVE,
        });
        return response.items;
      }}
      transformToOption={course => {
        return {
          label: course['name'],
          searchValue: course['name'],
          value: course['id'],
          rawData: course,
        };
      }}
      className="w-full"
    />
  );
};
