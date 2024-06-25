import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { getJobTitleMappingToLabels } from '../../constants/JobTitleMappingToLabels';
import { JobTitleEnum } from '../../models/JobTitleEnum';

interface Props {
  jobTitle?: JobTitleEnum;
  onChange?: SelectSingleProps<JobTitleEnum>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectJobTitle = ({ jobTitle, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['enum']);

  const jobTitleMappingToLabels = useMemo(() => {
    return getJobTitleMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('enum:jobTitle.label')}
      value={jobTitle}
      onChange={onChange}
      options={Object.values(JobTitleEnum).map(item => {
        return {
          label: jobTitleMappingToLabels[item],
          searchValue: jobTitleMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
