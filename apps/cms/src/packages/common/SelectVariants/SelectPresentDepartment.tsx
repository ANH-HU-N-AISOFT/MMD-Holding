import { useTranslation } from 'react-i18next';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';

interface Props {
  presentDepartment?: Employee['employeeId'];
  onChange?: SelectSingleDecouplingProps<Employee, Employee['employeeId']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectPresentDepartment = ({ disabled, allowClear = true, presentDepartment, onChange }: Props) => {
  const { t } = useTranslation(['department']);

  return (
    <SelectSingleDecoupling
      allowClear={allowClear}
      placeholder={t('department:present_department')}
      disabled={disabled}
      value={presentDepartment}
      onChange={onChange}
      service={async ({ page, search }) => {
        const response = await getEmployees({ page, query: search });
        return {
          loadmorable: page < response.headers['x-pages-count'],
          items: response.items,
        };
      }}
      transformToOption={employee => ({
        label: employee.fullName,
        value: employee.employeeId,
        rawData: employee,
      })}
      className="w-full"
    />
  );
};
