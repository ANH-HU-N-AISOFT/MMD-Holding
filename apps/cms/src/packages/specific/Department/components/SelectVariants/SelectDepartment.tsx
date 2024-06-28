import { prop, uniqBy } from 'ramda';
import { useTranslation } from 'react-i18next';
import { SelectSingleDecoupling, SelectSingleDecouplingProps } from 'reactjs';
import { DepartmentPopulated } from '../../models/DepartmentPopulated';
import { GetAllParams } from '~/constants/GetAllParams';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';

interface Props {
  department: string | undefined;
  onChange: SelectSingleDecouplingProps<DepartmentPopulated, string>['onChange'] | undefined;
  disabled: boolean;
  extraDepartments: DepartmentPopulated[];
  // Nếu là "allSystem" ==> Bỏ giới hạn "currentUser"
  scope: 'allSystem' | 'currentUser';
  allowClear?: boolean;
  placeholder?: string;
  fieldValue?: keyof DepartmentPopulated;
  fieldLabel?: Array<keyof DepartmentPopulated>;
}

export const SelectDepartment = ({
  disabled,
  department,
  allowClear = true,
  placeholder,
  onChange,
  fieldValue = 'id',
  fieldLabel = ['name', 'code'],
  extraDepartments,
  scope,
}: Props) => {
  const { t } = useTranslation(['department']);

  return (
    <SelectSingleDecoupling<DepartmentPopulated, string>
      allowClear={allowClear}
      placeholder={placeholder ?? t('department:department')}
      disabled={disabled}
      value={department}
      onChange={onChange}
      depsFetch={[scope]}
      service={async () => {
        const response = await getDepartments({
          ...GetAllParams,
          withoutPermission: scope === 'allSystem',
          sortByName: 1,
        });
        return uniqBy(prop('id'), [...extraDepartments, ...response.items]);
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
