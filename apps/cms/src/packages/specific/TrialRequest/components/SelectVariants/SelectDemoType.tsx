import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { getDemoTypeMappingToLabels } from '../../constants/DemoTypeMappingToLabels';
import { DemoType } from '../../models/DemoType';

interface Props {
  demoType?: DemoType;
  onChange?: SelectSingleProps<DemoType>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectDemoType = ({ demoType, disabled, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['trial_request']);

  const demoTypeMappingToLabels = useMemo(() => {
    return getDemoTypeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={placeholder ?? t('trial_request:demo_type')}
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
