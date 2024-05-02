import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EmploymentContractType } from './constants/EmploymentContractType';
import { SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { getEmploymentContractTypeMappingToLabels } from '~/packages/common/SelectVariants/EmploymentContractType/constants/EmploymentContractTypeMappingToLabels';

interface Props {
  employmentContractType?: EmploymentContractType;
  onChange?: SelectSingleProps<EmploymentContractType>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectEmploymentContractType = ({ employmentContractType, disabled, allowClear, onChange }: Props) => {
  const { t } = useTranslation(['common', 'enum']);

  const employmentContractTypeMappingToLabels = useMemo(() => {
    return getEmploymentContractTypeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('enum:contractType.label')}
      value={employmentContractType}
      onChange={onChange}
      options={Object.values(EmploymentContractType).map(item => {
        return {
          label: employmentContractTypeMappingToLabels[item],
          value: item,
        };
      })}
    />
  );
};
