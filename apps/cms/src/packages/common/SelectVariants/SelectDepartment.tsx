import { useTranslation } from 'react-i18next';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
import { Department } from '~/packages/specific/Department/models/Department';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';

interface Props {
  department?: Department['id'];
  onChange?: SelectSingleDecouplingProps<Department, Department['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

export const SelectDepartment = ({ disabled, department, allowClear, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['employee']);

  return (
    <SelectSingleDecoupling
      allowClear={allowClear}
      placeholder={placeholder ?? t('employee:department')}
      disabled={disabled}
      value={department}
      onChange={onChange}
      service={async ({ page, search }) => {
        const response = await getDepartments({ page, query: search });
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
