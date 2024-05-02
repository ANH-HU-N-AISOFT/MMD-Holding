import { useTranslation } from 'react-i18next';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
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
  allowClear,
  placeholder,
  onChange,
  fieldValue = 'id',
  fieldLabel = 'name',
}: Props) => {
  const { t } = useTranslation(['employee']);

  return (
    <SelectSingleDecoupling
      allowClear={allowClear}
      placeholder={placeholder ?? t('employee:department')}
      disabled={disabled}
      value={department}
      onChange={onChange}
      service={async ({ page, search }) => {
        const response = await getDepartments({ page, query: search });
        return {
          loadmorable: page < response.headers['x-pages-count'],
          items: response.items,
        };
      }}
      transformToOption={department => ({ label: department[fieldLabel], value: department[fieldValue] })}
      className="w-full"
    />
  );
};
