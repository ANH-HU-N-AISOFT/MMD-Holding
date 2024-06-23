import { prop, uniqBy } from 'ramda';
import { useTranslation } from 'react-i18next';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
import { GetAllParams } from '~/constants/GetAllParams';
import { Department } from '~/packages/specific/Department/models/Department';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';

type DepartmentFields = Pick<Department, 'id' | 'code' | 'name'>;
interface Props {
  managementUnit?: DepartmentFields['id'];
  onChange?: SelectSingleDecouplingProps<DepartmentFields, Department['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  extraDepartments: DepartmentFields[];
}

export const SelectManagementUnit = ({
  disabled,
  managementUnit,
  allowClear = true,
  onChange,
  extraDepartments = [],
}: Props) => {
  const { t } = useTranslation(['department']);

  return (
    <SelectSingleDecoupling
      allowClear={allowClear}
      placeholder={t('department:manage_department')}
      disabled={disabled}
      value={managementUnit}
      onChange={onChange}
      service={async () => {
        const response = await getDepartments({
          ...GetAllParams,
          isManagementUnit: true,
          sortByName: 1,
        });
        return uniqBy(prop('id'), [...extraDepartments, ...response.items]);
      }}
      transformToOption={department => ({
        label: [department.name, department.code].filter(Boolean).join(' - '),
        value: department.id,
        searchValue: [department.name, department.code].filter(Boolean).join('-'),
        rawData: department,
      })}
      className="w-full"
    />
  );
};
