import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { getSourceEnumMappingToLabels } from '../../constants/SourceEnumMappingToLabels';
import { SourceEnum } from '../../models/SourceEnum';

interface Props {
  sourceEnum?: SourceEnum;
  onChange?: SelectSingleProps<SourceEnum>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: ReactNode;
}

export const SelectSourceEnum = ({ sourceEnum, disabled, allowClear = true, onChange, placeholder }: Props) => {
  const { t } = useTranslation(['student']);

  const sourceEnumMappingToLabels = useMemo(() => {
    return getSourceEnumMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('student:source')}
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
