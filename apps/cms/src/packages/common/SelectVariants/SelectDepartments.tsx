import { useTranslation } from 'react-i18next';
import {
  SelectMultipleDecouplingWithPagination,
  SelectMultipleDecouplingWithPaginationProps,
} from '~/components/SelectDecoupling/SelectMultipleDecouplingWithPagination';
import { Department } from '~/packages/specific/Department/models/Department';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';

interface Props {
  departments?: Array<Department['id']>;
  onChange?: SelectMultipleDecouplingWithPaginationProps<Department, Array<Department['id']>>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  fieldValue?: keyof Pick<Department, 'id' | 'code'>;
  fieldLabel?: keyof Pick<Department, 'name' | 'code'>;
}

export const SelectDepartments = ({
  disabled,
  departments,
  allowClear = true,
  placeholder,
  onChange,
  fieldValue = 'id',
  fieldLabel = 'name',
}: Props) => {
  const { t } = useTranslation(['employee']);

  return (
    <SelectMultipleDecouplingWithPagination
      allowClear={allowClear}
      placeholder={placeholder ?? t('employee:department')}
      disabled={disabled}
      value={departments}
      onChange={onChange}
      service={async ({ page, search }) => {
        const response = await getDepartments({ page, query: search });
        return {
          loadmorable: page < response.headers['x-pages-count'],
          items: response.items,
        };
      }}
      transformToOption={department => ({
        label: department[fieldLabel],
        value: department[fieldValue],
        rawData: department,
      })}
      className="w-full"
    />
  );
};
