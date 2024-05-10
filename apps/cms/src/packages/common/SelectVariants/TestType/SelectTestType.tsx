import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TestType } from './constants/TestType';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getTestTypeMappingToLabels } from '~/packages/common/SelectVariants/TestType/constants/TestTypeMappingToLabels';

interface Props {
  testType?: TestType;
  onChange?: SelectSingleProps<TestType>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectTestType = ({ testType, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const testTypeMappingToLabels = useMemo(() => {
    return getTestTypeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:testType.label')}
      value={testType}
      onChange={onChange}
      options={Object.values(TestType).map(item => {
        return {
          label: testTypeMappingToLabels[item],
          searchValue: testTypeMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
