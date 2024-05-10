import { useTranslation } from 'react-i18next';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
import { TooltipDetailInformation } from '~/components/TooltipDetailInformation/TooltipDetailInformation';
import { GetAllParams } from '~/constants/GetAllParams';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';

interface Props {
  presentDepartment?: Employee['employeeId'];
  onChange?: SelectSingleDecouplingProps<Employee, Employee['employeeId']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectPresentDepartment = ({ disabled, allowClear = true, presentDepartment, onChange }: Props) => {
  const { t } = useTranslation(['department', 'employee']);

  return (
    <SelectSingleDecoupling
      allowClear={allowClear}
      placeholder={t('department:present_department')}
      disabled={disabled}
      value={presentDepartment}
      onChange={onChange}
      service={async () => {
        const response = await getEmployees({
          ...GetAllParams,
          sortByName: 1,
        });
        return response.items;
      }}
      transformToOption={employee => ({
        label: (
          <TooltipDetailInformation
            title={[employee.fullName, employee.employee?.code].filter(Boolean).join(' - ')}
            extra={[
              [t('employee:phone'), employee.phoneNumber].join(': '),
              [t('employee:work_email'), employee.workEmail].join(': '),
            ]}
          />
        ),
        value: employee.employeeId,
        rawData: employee,
        searchValue: [employee.fullName, employee.employee?.code, employee.workEmail, employee.phoneNumber]
          .filter(Boolean)
          .join('-'),
      })}
      className="w-full"
    />
  );
};
