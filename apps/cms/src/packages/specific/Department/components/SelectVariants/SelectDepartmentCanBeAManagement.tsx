import { prop, uniqBy } from 'ramda';
import { useTranslation } from 'react-i18next';
import { SelectSingleDecoupling, SelectSingleDecouplingProps } from 'reactjs';
import { DepartmentPopulated } from '../../models/DepartmentPopulated';
import { GetAllParams } from '~/constants/GetAllParams';
import { Department } from '~/packages/specific/Department/models/Department';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';

interface Props {
  managementUnit?: DepartmentPopulated['id'];
  onChange?: SelectSingleDecouplingProps<DepartmentPopulated, Department['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  extraDepartments: DepartmentPopulated[];
}

export const SelectDepartmentCanBeAManagement = ({
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
          withoutPermission: false,
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
