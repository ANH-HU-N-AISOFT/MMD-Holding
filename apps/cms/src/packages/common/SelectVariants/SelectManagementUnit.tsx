import { useTranslation } from 'react-i18next';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
import { GetAllParams } from '~/constants/GetAllParams';
import { Department } from '~/packages/specific/Department/models/Department';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';

interface Props {
  managementUnit?: Department['id'];
  onChange?: SelectSingleDecouplingProps<Department, Department['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectManagementUnit = ({ disabled, managementUnit, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['department']);

  return (
    <SelectSingleDecoupling
      allowClear={allowClear}
      placeholder={t('department:manage_department')}
      disabled={disabled}
      value={managementUnit}
      onChange={onChange}
      service={async () => {
        const response = await getDepartments({
          ...GetAllParams,
          isManagementUnit: true,
          sortByName: 1,
        });
        return response.items;
      }}
      transformToOption={department => ({
        label: [department.name, department.code].filter(Boolean).join(' - '),
        value: department.id,
        searchValue: [department.name, department.code].filter(Boolean).join('-'),
        rawData: department,
      })}
      className="w-full"
    />
  );
};
