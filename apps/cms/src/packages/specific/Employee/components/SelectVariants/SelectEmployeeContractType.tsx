import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectSingle, SelectSingleProps } from 'reactjs';
import { getContractTypeMappingToLabels } from '../../constants/ContractTypeMappingToLabels';
import { ContractType } from '../../models/ContractType';

interface Props {
  contractType?: ContractType;
  onChange?: SelectSingleProps<ContractType>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectContractType = ({ contractType, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['employee']);

  const ContractTypeMappingToLabels = useMemo(() => {
    return getContractTypeMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className="w-full"
      placeholder={t('employee:employee_contract_type')}
      value={contractType}
      onChange={onChange}
      options={Object.values(ContractType).map(item => {
        return {
          label: ContractTypeMappingToLabels[item],
          searchValue: ContractTypeMappingToLabels[item],
          value: item,
          rawData: item,
        };
      })}
    />
  );
};
