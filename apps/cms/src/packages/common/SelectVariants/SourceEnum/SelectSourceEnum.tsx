import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { SourceEnum } from './constants/SourceEnum';
import { getSourceEnumMappingToLabels } from './constants/SourceEnumMappingToLabels';

interface Props {
  sourceEnum?: SourceEnum;
  onChange?: SelectSingleProps<SourceEnum>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: ReactNode;
}

export const SelectSourceEnum = ({ sourceEnum, disabled, allowClear = true, onChange, placeholder }: Props) => {
  const { t } = useTranslation(['enum']);

  const sourceEnumMappingToLabels = useMemo(() => {
    return getSourceEnumMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:source.label')}
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
