import { Empty } from 'antd';
import { isEmpty } from 'ramda';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EmployeeStatus } from './EmployeeStatus/constants/EmployeeStatus';
import { Role } from './Role/constants/Role';
import {
  SelectMultipleDecouplingWithPagination,
  SelectMultipleDecouplingWithPaginationProps,
} from '~/components/SelectDecoupling/SelectMultipleDecouplingWithPagination';
import { GetAllParams } from '~/constants/GetAllParams';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';

interface Props {
  saleEmployees?: Array<Employee['employeeId']>;
  onChange?: SelectMultipleDecouplingWithPaginationProps<Employee, Array<Employee['employeeId']>>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  organizations: string[];
}

export const SelectSaleEmployees = ({ disabled, allowClear = true, saleEmployees, onChange, organizations }: Props) => {
  const { t } = useTranslation(['student']);

  const needWarning = useMemo(() => isEmpty(organizations), [organizations]);

  return (
    <SelectMultipleDecouplingWithPagination
      key={organizations.join('-')}
      notFoundContent={needWarning ? <Empty description={t('student:must_select_department')} /> : undefined}
      allowClear={allowClear}
      placeholder={t('student:sale_employees')}
      disabled={disabled}
      value={saleEmployees}
      onChange={onChange}
      service={async ({ page, search }) => {
        if (!needWarning) {
          const response = await getEmployees({
            page,
            query: search,
            roles: Role.Sale,
            organizationId: organizations.join(','),
            workStatus: EmployeeStatus.WORKING,
            sortByName: 1,
            // FIXME: Vá tạm
            perPage: GetAllParams.perPage,
          });
          return {
            loadmorable: page < response.headers['x-pages-count'],
            items: response.items,
          };
        }
        return {
          items: [],
          loadmorable: false,
        };
      }}
      transformToOption={employee => ({ label: employee.fullName, value: employee.employeeId, rawData: employee })}
      className="w-full"
    />
  );
};
