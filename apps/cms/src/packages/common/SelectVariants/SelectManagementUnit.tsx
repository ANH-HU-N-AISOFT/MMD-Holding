import { useTranslation } from 'react-i18next';
import {
  SelectSingleDecouplingWithPagination,
  SelectSingleDecouplingWithPaginationProps,
} from '~/components/SelectDecoupling/SelectSingleDecouplingWithPagination';
import { Department } from '~/packages/specific/Department/models/Department';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';

interface Props {
  managementUnit?: Department['id'];
  onChange?: SelectSingleDecouplingWithPaginationProps<Department, Department['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectManagementUnit = ({ disabled, managementUnit, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['department']);

  return (
    <SelectSingleDecouplingWithPagination
      allowClear={allowClear}
      placeholder={t('department:manage_department')}
      disabled={disabled}
      value={managementUnit}
      onChange={onChange}
      service={async ({ page, search }) => {
        const response = await getDepartments({
          isManagementUnit: true,
          page,
          query: search,
          sortByName: 1,
        });
        return {
          loadmorable: page < response.headers['x-pages-count'],
          items: response.items,
        };
      }}
      transformToOption={department => ({
        label: department.name,
        value: department.id,
        rawData: department,
      })}
      className="w-full"
    />
  );
};
