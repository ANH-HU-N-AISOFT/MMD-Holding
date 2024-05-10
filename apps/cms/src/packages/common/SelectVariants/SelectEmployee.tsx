import { useTranslation } from 'react-i18next';
import { Role } from './Role/constants/Role';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
import { TooltipDetailInformation } from '~/components/TooltipDetailInformation/TooltipDetailInformation';
import { GetAllParams } from '~/constants/GetAllParams';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';

interface Props {
  employee?: Employee['employeeId'];
  onChange?: SelectSingleDecouplingProps<Employee, Employee['employeeId']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  roles?: Role[];
}

export const SelectEmployee = ({
  disabled,
  allowClear = true,
  employee: directionManager,
  onChange,
  placeholder,
  roles,
}: Props) => {
  const { t } = useTranslation(['employee']);

  return (
    <SelectSingleDecoupling
      allowClear={allowClear}
      placeholder={placeholder ?? t('employee:employee')}
      disabled={disabled}
      value={directionManager}
      onChange={onChange}
      service={async () => {
        const response = await getEmployees({
          ...GetAllParams,
          sortByName: 1,
          roles: roles?.join(','),
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
