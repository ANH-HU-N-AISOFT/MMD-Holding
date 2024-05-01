import { useTranslation } from 'react-i18next';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
import { Department } from '~/packages/specific/Department/models/Department';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';

interface Props {
  managementUnit?: Department['id'];
  onChange?: SelectSingleDecouplingProps<Department, Department['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectManagementUnit = ({ disabled, managementUnit, allowClear, onChange }: Props) => {
  const { t } = useTranslation(['department']);

  return (
    <SelectSingleDecoupling
      allowClear={allowClear}
      placeholder={t('department:manage_department')}
      disabled={disabled}
      value={managementUnit}
      onChange={onChange}
      service={async ({ page, search }) => {
        const response = await getDepartments({ isManagementUnit: true, page, query: search });
        return {
          loadmorable: page < response.headers['x-pages-count'],
          items: response.items,
        };
      }}
      transformToOption={department => ({ label: department.name, value: department.id })}
      className="w-full"
    />
  );
};
