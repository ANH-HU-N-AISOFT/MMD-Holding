import { useTranslation } from 'react-i18next';
import { OptionWithDetailInformation } from './@components/OptionWithDetailInformation';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
import { GetAllParams } from '~/constants/GetAllParams';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployees } from '~/packages/specific/Employee/services/getEmployees';

interface Props {
  directionManager?: Employee['employeeId'];
  onChange?: SelectSingleDecouplingProps<Employee, Employee['employeeId']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectDirectionManager = ({ disabled, allowClear = true, directionManager, onChange }: Props) => {
  const { t } = useTranslation(['employee']);

  return (
    <SelectSingleDecoupling
      allowClear={allowClear}
      placeholder={t('employee:direction_manager')}
      disabled={disabled}
      value={directionManager}
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
          <OptionWithDetailInformation
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
