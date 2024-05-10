import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IeltsTestEnum } from './constants/IeltsTestEnum';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getIeltsTestEnumMappingToLabels } from '~/packages/common/SelectVariants/IeltsTestEnum/constants/IeltsTestEnumMappingToLabels';

interface Props {
  ieltsTest?: IeltsTestEnum;
  onChange?: SelectSingleProps<IeltsTestEnum>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectIeltsTestEnum = ({ ieltsTest, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const ieltsTestMappingToLabels = useMemo(() => {
    return getIeltsTestEnumMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:ieltsTest.label')}
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
