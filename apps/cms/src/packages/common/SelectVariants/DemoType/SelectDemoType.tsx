import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoType } from './constants/DemoType';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getDemoTypeMappingToLabels } from '~/packages/common/SelectVariants/DemoType/constants/DemoTypeMappingToLabels';

interface Props {
  demoType?: DemoType;
  onChange?: SelectSingleProps<DemoType>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectDemoType = ({ demoType, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const demoTypeMappingToLabels = useMemo(() => {
    return getDemoTypeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('enum:demoType.label')}
      value={demoType}
      onChange={onChange}
      options={Object.values(DemoType).map(item => {
        return {
          label: demoTypeMappingToLabels[item],
          searchValue: demoTypeMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};