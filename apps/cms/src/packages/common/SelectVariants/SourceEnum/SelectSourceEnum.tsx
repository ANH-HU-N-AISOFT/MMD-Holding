import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SourceEnum } from './constants/SourceEnum';
import { getSourceEnumMappingToLabels } from './constants/SourceEnumMappingToLabels';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';

interface Props {
  sourceEnum?: SourceEnum;
  onChange?: SelectSingleProps<SourceEnum>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectSourceEnum = ({ sourceEnum, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const sourceEnumMappingToLabels = useMemo(() => {
    return getSourceEnumMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('enum:source.label')}
      value={sourceEnum}
      onChange={onChange}
      options={Object.values(SourceEnum).map(item => {
        return {
          label: sourceEnumMappingToLabels[item],
          value: item,
          searchValue: sourceEnumMappingToLabels[item],
          rawData: item,
        };
      })}
    />
  );
};
