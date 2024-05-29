import { Empty } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EmployeeStatus } from './EmployeeStatus/constants/EmployeeStatus';
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
  organizationId: 'GET_ALL' | string | undefined;
  emptyText: string;
}

export const SelectEmployee = ({
  disabled,
  allowClear = true,
  employee: directionManager,
  onChange,
  placeholder,
  roles,
  organizationId,
  emptyText,
}: Props) => {
  const { t } = useTranslation(['employee']);
  const needWarning = useMemo(() => !organizationId, [organizationId]);

  return (
    <SelectSingleDecoupling
      notFoundContent={needWarning && emptyText ? <Empty description={emptyText} /> : undefined}
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
          workStatus: EmployeeStatus.WORKING,
          organizationId: organizationId === 'GET_ALL' ? undefined : organizationId,
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
