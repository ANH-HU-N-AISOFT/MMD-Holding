import { useTranslation } from 'react-i18next';
import {
  SelectSingleDecouplingWithPagination,
  SelectSingleDecouplingWithPaginationProps,
} from '~/components/SelectDecoupling/SelectSingleDecouplingWithPagination';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';

interface Props {
  directionManager?: Employee['employeeId'];
  onChange?: SelectSingleDecouplingWithPaginationProps<Employee, Employee['employeeId']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectDirectionManager = ({ disabled, allowClear = true, directionManager, onChange }: Props) => {
  const { t } = useTranslation(['employee']);

  return (
    <SelectSingleDecouplingWithPagination
      allowClear={allowClear}
      placeholder={t('employee:direction_manager')}
      disabled={disabled}
      value={directionManager}
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
