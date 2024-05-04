import { useTranslation } from 'react-i18next';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
import { GetAllParams } from '~/constants/GetAllParams';
import { Department } from '~/packages/specific/Department/models/Department';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';

interface Props {
  department?: Department['id'];
  onChange?: SelectSingleDecouplingProps<Department, Department['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  fieldValue?: keyof Pick<Department, 'id' | 'code'>;
  fieldLabel?: keyof Pick<Department, 'name' | 'code'>;
}

export const SelectDepartment = ({
  disabled,
  department,
  allowClear = true,
  placeholder,
  onChange,
  fieldValue = 'id',
  fieldLabel = 'name',
}: Props) => {
  const { t } = useTranslation(['employee']);

  return (
    <SelectSingleDecoupling<Department, Department['id']>
      allowClear={allowClear}
      placeholder={placeholder ?? t('employee:department')}
      disabled={disabled}
      value={department}
      onChange={onChange}
      service={async () => {
        const response = await getDepartments({
          ...GetAllParams,
          sortByName: 1,
        });
        return response.items;
      }}
      transformToOption={department => ({
        label: department[fieldLabel],
        searchValue: department[fieldLabel],
        value: department[fieldValue],
        rawData: department,
      })}
      className="w-full"
    />
  );
};
