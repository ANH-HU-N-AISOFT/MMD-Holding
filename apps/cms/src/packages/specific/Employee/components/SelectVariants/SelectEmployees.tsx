import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'reactjs';
import { SelectMultipleDecoupling, SelectMultipleDecouplingProps } from 'reactjs';
import { Role } from '../../../../common/SelectVariants/Role/constants/Role';
import { EmployeePopulated } from '../../models/EmployeePopulated';
import { WorkStatus } from '../../models/WorkStatus';
import { TooltipDetailInformation } from '~/components/TooltipDetailInformation/TooltipDetailInformation';
import { GetAllParams } from '~/constants/GetAllParams';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';

interface SelectEmployeesInADepartment {
  emptyText: string;
  organizationId: string | string[] | undefined;
  scope: 'inADepartment';
}

interface SelectEmployeesOfSystem {
  scope: 'allSystem' | 'currentUser';
  organizationId?: undefined;
  emptyText?: undefined;
}

type Props = {
  employees: string[] | undefined;
  onChange: SelectMultipleDecouplingProps<Employee, string[]>['onChange'];
  disabled: boolean;
  allowClear?: boolean;
  placeholder?: string;
  role?: Role;
} & (SelectEmployeesOfSystem | SelectEmployeesInADepartment);

export const SelectEmployees = ({
  disabled,
  allowClear = true,
  employees,
  onChange,
  placeholder,
  role,
  organizationId,
  emptyText,
  scope,
}: Props) => {
  const { t } = useTranslation(['employee']);
  const needWarning = useMemo(() => !organizationId, [organizationId]);

  const handleFetchData = async (): Promise<EmployeePopulated[]> => {
    // Nếu theo "department" thì bỏ giới hạn "currentUser"
    if (scope === 'inADepartment') {
      if (organizationId) {
        const response = await getEmployees({
          ...GetAllParams,
          withoutPermission: true,
          sortByName: 1,
          roles: role,
          workStatus: WorkStatus.WORKING,
          organizationId: typeof organizationId === 'string' ? organizationId : organizationId.join(','),
        });
        return response.items;
      }
      return [];
    }
    if (scope === 'allSystem' || scope === 'currentUser') {
      const response = await getEmployees({
        ...GetAllParams,
        withoutPermission: scope === 'allSystem',
        sortByName: 1,
        roles: role,
        workStatus: WorkStatus.WORKING,
      });
      return response.items;
    }
    return [];
  };

  return (
    <SelectMultipleDecoupling
      notFoundContent={needWarning && emptyText ? <Empty description={emptyText} /> : undefined}
      allowClear={allowClear}
      placeholder={placeholder ?? t('employee:employee')}
      disabled={disabled}
      value={employees}
      onChange={onChange}
      service={handleFetchData}
      depsFetch={[organizationId, scope, role]}
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
