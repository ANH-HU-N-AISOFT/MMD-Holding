import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { getCourseStatusMappingToLabels } from '../../constants/CourseStatusMappingToLabels';
import { CourseStatus } from '../../models/CourseStatus';

interface Props {
  courseStatus?: CourseStatus;
  onChange?: SelectSingleProps<CourseStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectCourseStatus = ({ courseStatus, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['course']);

  const CourseStatusMappingToLabels = useMemo(() => {
    return getCourseStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('course:status')}
      value={courseStatus}
      onChange={onChange}
      options={Object.values(CourseStatus).map(item => {
        return {
          label: CourseStatusMappingToLabels[item],
          searchValue: CourseStatusMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
