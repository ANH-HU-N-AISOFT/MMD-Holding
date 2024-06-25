import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { SelectSingleDecoupling, SelectSingleDecouplingProps } from 'reactjs';
import { CourseStatus } from './CourseStatus/constants/CourseStatus';
import { GetAllParams } from '~/constants/GetAllParams';
import { CourseCombo } from '~/packages/specific/CourseCombo/models/CourseCombo';
import { getCourseCombos } from '~/packages/specific/CourseCombo/services/getCourseCombos';

interface Props {
  courseCombo?: CourseCombo['id'];
  onChange?: SelectSingleDecouplingProps<CourseCombo, CourseCombo['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  className?: string;
}

export const SelectCourseCombo = ({
  disabled,
  courseCombo,
  allowClear = true,
  placeholder,
  onChange,
  className,
}: Props) => {
  const { t } = useTranslation(['course_combo']);

  return (
    <SelectSingleDecoupling<CourseCombo, CourseCombo['id']>
      allowClear={allowClear}
      placeholder={placeholder ?? t('course_combo:course_combo')}
      disabled={disabled}
      value={courseCombo}
      onChange={onChange}
      service={async () => {
        const response = await getCourseCombos({
          ...GetAllParams,
          sortByName: 1,
          status: CourseStatus.ACTIVE,
        });
        return response.items;
      }}
      transformToOption={courseCombo => {
        return {
          label: courseCombo['name'],
          searchValue: courseCombo['name'],
          value: courseCombo['id'],
          rawData: courseCombo,
        };
      }}
      className={classNames('w-full', className)}
    />
  );
};
