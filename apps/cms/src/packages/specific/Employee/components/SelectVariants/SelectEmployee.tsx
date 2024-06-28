import { isEmpty } from 'ramda';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'reactjs';
import { SelectSingleDecoupling, SelectSingleDecouplingProps } from 'reactjs';
import { Role } from '../../../../common/SelectVariants/Role/constants/Role';
import { EmployeePopulated } from '../../models/EmployeePopulated';
import { WorkStatus } from '../../models/WorkStatus';
import { TooltipDetailInformation } from '~/components/TooltipDetailInformation/TooltipDetailInformation';
import { GetAllParams } from '~/constants/GetAllParams';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';

interface SelectEmployeeInADepartment {
  emptyText: string;
  organizationIds: string[] | undefined;
  scope: 'inADepartment';
}

interface SelectEmployeeOfSystem {
  scope: 'allSystem';
  organizationIds?: undefined;
  emptyText?: undefined;
}

type Props = {
  employee: Employee['employeeId'] | undefined;
  disabled: boolean;
  onChange: SelectSingleDecouplingProps<Employee, Employee['employeeId']>['onChange'];
  allowClear?: boolean;
  placeholder?: string;
  role?: Role;
} & (SelectEmployeeOfSystem | SelectEmployeeInADepartment);

export const SelectEmployee = ({
  disabled,
  allowClear = true,
  employee,
  onChange,
  placeholder,
  role,
  organizationIds,
  emptyText,
  scope,
}: Props) => {
  const { t } = useTranslation(['employee']);
  const needWarning = useMemo(() => isEmpty(organizationIds), [organizationIds]);

  const handleFetchData = async (): Promise<EmployeePopulated[]> => {
    // Nếu theo "department" thì bỏ giới hạn "currentUser"
    if (scope === 'inADepartment') {
      if (!isEmpty(organizationIds)) {
        const response = await getEmployees({
          ...GetAllParams,
          withoutPermission: true,
          sortByName: 1,
          roles: role ? [role] : undefined,
          workStatus: WorkStatus.WORKING,
          organizationIds,
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
        roles: role ? [role] : undefined,
        workStatus: WorkStatus.WORKING,
      });
      return response.items;
    }
    return [];
  };

  return (
    <SelectSingleDecoupling
      notFoundContent={needWarning && emptyText ? <Empty description={emptyText} /> : undefined}
      allowClear={allowClear}
      placeholder={placeholder ?? t('employee:employee')}
      disabled={disabled}
      value={employee}
      onChange={onChange}
      depsFetch={[organizationIds, scope, role]}
      service={handleFetchData}
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
