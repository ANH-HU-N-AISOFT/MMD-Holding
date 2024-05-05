import { useTranslation } from 'react-i18next';
import {
  SelectMultipleDecouplingWithPagination,
  SelectMultipleDecouplingWithPaginationProps,
} from '~/components/SelectDecoupling/SelectMultipleDecouplingWithPagination';
import { GetAllParams } from '~/constants/GetAllParams';
import { Department } from '~/packages/specific/Department/models/Department';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';

interface Props {
  departments?: Array<Department['id']>;
  onChange?: SelectMultipleDecouplingWithPaginationProps<Department, Array<Department['id']>>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  fieldValue?: keyof Pick<Department, 'id' | 'code'>;
  fieldLabel?: Array<keyof Pick<Department, 'name' | 'code'>>;
}

export const SelectDepartments = ({
  disabled,
  departments,
  allowClear = true,
  placeholder,
  onChange,
  fieldValue = 'id',
  fieldLabel = ['name', 'code'],
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
        const response = await getDepartments({
          page,
          query: search,
          // FIXME: Vá tạm
          perPage: GetAllParams.perPage,
          sortByName: 1,
        });
        return {
          loadmorable: page < response.headers['x-pages-count'],
          items: response.items,
        };
      }}
      transformToOption={department => {
        const label = fieldLabel.map(item => department[item]).join(' - ');
        return {
          label: label,
          searchValue: label,
          value: department[fieldValue],
          rawData: department,
        };
      }}
      className="w-full"
    />
  );
};
