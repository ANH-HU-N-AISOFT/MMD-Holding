import { isEmpty } from 'ramda';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'reactjs';
import { SelectMultipleDecoupling, SelectMultipleDecouplingProps } from 'reactjs';
import { EmployeeStatus } from './EmployeeStatus/constants/EmployeeStatus';
import { Role } from './Role/constants/Role';
import { TooltipDetailInformation } from '~/components/TooltipDetailInformation/TooltipDetailInformation';
import { GetAllParams } from '~/constants/GetAllParams';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';

interface Props {
  saleEmployees?: Array<Employee['employeeId']>;
  onChange?: SelectMultipleDecouplingProps<Employee, Array<Employee['employeeId']>>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  organizations: 'GET_ALL' | string[];
}

export const SelectSaleEmployees = ({ disabled, allowClear = true, saleEmployees, onChange, organizations }: Props) => {
  const { t } = useTranslation(['student', 'employee']);

  const needWarning = useMemo(() => isEmpty(organizations), [organizations]);

  return (
    <SelectMultipleDecoupling
      notFoundContent={needWarning ? <Empty description={t('student:must_select_department')} /> : undefined}
      allowClear={allowClear}
      placeholder={t('student:sale_employees')}
      disabled={disabled}
      value={saleEmployees}
      onChange={onChange}
      service={async () => {
        if (!needWarning) {
          const response = await getEmployees({
            ...GetAllParams,
            roles: Role.Sale,
            workStatus: EmployeeStatus.WORKING,
            sortByName: 1,
          });
          return response.items;
        }
        return [];
      }}
      depsTransformOption={organizations === 'GET_ALL' ? [] : [organizations]}
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
        hidden:
          organizations === 'GET_ALL'
            ? false
            : !employee.organization?.id || !organizations.includes(employee.organization.id),
        value: employee.employeeId,
        searchValue: [employee.fullName, employee.employee?.code, employee.workEmail, employee.phoneNumber]
          .filter(Boolean)
          .join('-'),
        rawData: employee,
      })}
      className="w-full"
    />
  );
};
