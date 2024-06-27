import { prop, uniqBy } from 'ramda';
import { useTranslation } from 'react-i18next';
import { SelectSingleDecoupling, SelectSingleDecouplingProps } from 'reactjs';
import { DepartmentPopulated } from '../../models/DepartmentPopulated';
import { GetDepartmentsInSelect, getDepartmentsInSelect } from '../../services/getDepartmentsInSelect';

interface Props {
  department?: DepartmentPopulated['id'];
  onChange?: SelectSingleDecouplingProps<DepartmentPopulated, DepartmentPopulated['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  fieldValue?: keyof Pick<DepartmentPopulated, 'id' | 'code'>;
  fieldLabel?: Array<keyof Pick<DepartmentPopulated, 'name' | 'code'>>;
  extraDepartments: DepartmentPopulated[];
  params?: GetDepartmentsInSelect;
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
  params = {},
}: Props) => {
  const { t } = useTranslation(['department']);

  return (
    <SelectSingleDecoupling<DepartmentPopulated, DepartmentPopulated['id']>
      allowClear={allowClear}
      placeholder={placeholder ?? t('department:department')}
      disabled={disabled}
      value={department}
      onChange={onChange}
      depsFetch={[params]}
      service={async () => {
        const response = await getDepartmentsInSelect(params);
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
