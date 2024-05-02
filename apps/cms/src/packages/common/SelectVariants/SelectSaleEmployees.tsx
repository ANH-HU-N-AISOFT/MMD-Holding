import { useTranslation } from 'react-i18next';
import { Role } from './Role/constants/Role';
import {
  SelectMultipleDecoupling,
  SelectMultipleDecouplingProps,
} from '~/components/SelectDecoupling/SelectMultipleDecoupling';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';

interface Props {
  saleEmployees?: Array<Employee['employeeId']>;
  onChange?: SelectMultipleDecouplingProps<Employee, Array<Employee['employeeId']>>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

// FIXME: Có cần select chỉ những nhân viên đang đi làm
export const SelectSaleEmployees = ({ disabled, allowClear, saleEmployees, onChange }: Props) => {
  const { t } = useTranslation(['student']);

  return (
    <SelectMultipleDecoupling
      allowClear={allowClear}
      placeholder={t('student:sale_employees')}
      disabled={disabled}
      value={saleEmployees}
      onChange={onChange}
      service={async ({ page, search }) => {
        const response = await getEmployees({ page, query: search, role: Role.Sale });
        return {
          loadmorable: page < response.headers['x-pages-count'],
          items: response.items,
        };
      }}
      transformToOption={employee => ({ label: employee.fullName, value: employee.employeeId })}
      className="w-full"
    />
  );
};
