import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getJobTitleMappingToLabels } from '~/packages/specific/Employee/constants/JobTitleMappingToLabels';
import { JobTitleEnum } from '~/packages/specific/Employee/models/Employee';

interface Props {
  jobTitle?: JobTitleEnum;
  onChange?: SelectSingleProps<JobTitleEnum>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectJobTitle = ({ jobTitle, disabled, allowClear, onChange }: Props) => {
  const { t } = useTranslation(['common', 'employee']);
  const jobTitleMappingToLabels = useMemo(() => {
    return getJobTitleMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('employee:job_title')}
      value={jobTitle}
      onChange={onChange}
      options={Object.values(JobTitleEnum).map(item => {
        return {
          label: jobTitleMappingToLabels[item],
          value: item,
        };
      })}
    />
  );
};
