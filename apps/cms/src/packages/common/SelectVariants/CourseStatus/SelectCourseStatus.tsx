import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { CourseStatus } from './constants/CourseStatus';
import { getCourseStatusMappingToLabels } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatusMappingToLabels';

interface Props {
  courseStatus?: CourseStatus;
  onChange?: SelectSingleProps<CourseStatus>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectCourseStatus = ({ courseStatus, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const courseStatusMappingToLabels = useMemo(() => {
    return getCourseStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:courseStatus.label')}
      value={courseStatus}
      onChange={onChange}
      options={Object.values(CourseStatus).map(item => {
        return {
          label: courseStatusMappingToLabels[item],
          searchValue: courseStatusMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
