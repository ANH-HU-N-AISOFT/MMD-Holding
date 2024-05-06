import { Empty } from 'antd';
import { isEmpty } from 'ramda';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { OptionWithDetailInformation } from './@components/OptionWithDetailInformation';
import { EmployeeStatus } from './EmployeeStatus/constants/EmployeeStatus';
import { Role } from './Role/constants/Role';
import {
  SelectMultipleDecoupling,
  SelectMultipleDecouplingProps,
} from '~/components/SelectDecoupling/SelectMultipleDecoupling';
import { GetAllParams } from '~/constants/GetAllParams';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';

interface Props {
  saleEmployees?: Array<Employee['employeeId']>;
  onChange?: SelectMultipleDecouplingProps<Employee, Array<Employee['employeeId']>>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  organizations: string[];
}

export const SelectSaleEmployees = ({ disabled, allowClear = true, saleEmployees, onChange, organizations }: Props) => {
  const { t } = useTranslation(['student', 'employee']);

  const needWarning = useMemo(() => isEmpty(organizations), [organizations]);

  return (
    <SelectMultipleDecoupling
      key={organizations.join('-')}
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
      depsTransformOption={[organizations]}
      transformToOption={employee => ({
        label: (
          <OptionWithDetailInformation
            title={[employee.fullName, employee.employee?.code].filter(Boolean).join(' - ')}
            extra={[
              [t('employee:phone'), employee.phoneNumber].join(': '),
              [t('employee:work_email'), employee.workEmail].join(': '),
            ]}
          />
        ),
        hidden: !employee.organization?.id || !organizations.includes(employee.organization.id),
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
