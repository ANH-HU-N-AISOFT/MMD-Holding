import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectMultiple, SelectMultipleProps } from 'reactjs';
import { getJobTitleMappingToLabels } from '../../constants/JobTitleMappingToLabels';
import { JobTitleEnum } from '../../models/JobTitleEnum';

interface Props {
  jobTitles?: JobTitleEnum[];
  onChange?: SelectMultipleProps<JobTitleEnum[]>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectJobTitles = ({ jobTitles, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['employee']);

  const JobTitleMappingToLabels = useMemo(() => {
    return getJobTitleMappingToLabels(t);
  }, [t]);

  return (
    <SelectMultiple
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('employee:job_title')}
      value={jobTitles}
      onChange={onChange}
      options={Object.values(JobTitleEnum).map(item => {
        return {
          label: JobTitleMappingToLabels[item],
          searchValue: JobTitleMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
