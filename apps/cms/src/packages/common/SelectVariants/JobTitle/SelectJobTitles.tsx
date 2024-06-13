import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { JobTitleEnum } from './constants/JobTitleEnum';
import { SelectMultiple, SelectMultipleProps } from '~/components/AntCustom/Select';
import { getJobTitleMappingToLabels } from '~/packages/common/SelectVariants/JobTitle/constants/JobTitleMappingToLabels';

interface Props {
  jobTitles?: JobTitleEnum[];
  onChange?: SelectMultipleProps<JobTitleEnum[]>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectJobTitles = ({ jobTitles, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['enum']);

  const jobTitleMappingToLabels = useMemo(() => {
    return getJobTitleMappingToLabels(t);
  }, [t]);

  return (
    <SelectMultiple
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('enum:jobTitle.label')}
      value={jobTitles}
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
