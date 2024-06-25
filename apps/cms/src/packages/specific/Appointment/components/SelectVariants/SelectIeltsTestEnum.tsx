import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { getIeltsTestEnumMappingToLabels } from '../../constants/IeltsTestEnumMappingToLabels';
import { IeltsTestEnum } from '../../models/IeltsTestEnum';

interface Props {
  ieltsTest?: IeltsTestEnum;
  onChange?: SelectSingleProps<IeltsTestEnum>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectIeltsTestEnum = ({ ieltsTest, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['appointment']);

  const ieltsTestMappingToLabels = useMemo(() => {
    return getIeltsTestEnumMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('appointment:test')}
      value={ieltsTest}
      onChange={onChange}
      options={Object.values(IeltsTestEnum).map(item => {
        return {
          label: ieltsTestMappingToLabels[item],
          searchValue: ieltsTestMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
