import { useTranslation } from 'react-i18next';
import {
  SelectSingleDecouplingWithPagination,
  SelectSingleDecouplingWithPaginationProps,
} from '~/components/SelectDecoupling/SelectSingleDecouplingWithPagination';
import { GetAllParams } from '~/constants/GetAllParams';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';

interface Props {
  presentDepartment?: Employee['employeeId'];
  onChange?: SelectSingleDecouplingWithPaginationProps<Employee, Employee['employeeId']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectPresentDepartment = ({ disabled, allowClear = true, presentDepartment, onChange }: Props) => {
  const { t } = useTranslation(['department']);

  return (
    <SelectSingleDecouplingWithPagination
      allowClear={allowClear}
      placeholder={t('department:present_department')}
      disabled={disabled}
      value={presentDepartment}
      onChange={onChange}
      service={async ({ page, search }) => {
        const response = await getEmployees({
          page,
          query: search,
          sortByName: 1,
          // FIXME: Vá tạm
          perPage: GetAllParams.perPage,
        });
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
