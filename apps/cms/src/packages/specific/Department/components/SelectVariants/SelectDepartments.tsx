import { prop, uniqBy } from 'ramda';
import { useTranslation } from 'react-i18next';
import { SelectMultipleDecoupling, SelectMultipleDecouplingProps } from 'reactjs';
import { DepartmentPopulated } from '../../models/DepartmentPopulated';
import { GetDepartmentsInSelect, getDepartmentsInSelect } from '../../services/getDepartmentsInSelect';

interface Props {
  departments?: Array<DepartmentPopulated['id']>;
  onChange?: SelectMultipleDecouplingProps<DepartmentPopulated, Array<DepartmentPopulated['id']>>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  fieldValue?: keyof Pick<DepartmentPopulated, 'id' | 'code'>;
  fieldLabel?: Array<keyof Pick<DepartmentPopulated, 'name' | 'code'>>;
  extraDepartments: DepartmentPopulated[];
  params?: GetDepartmentsInSelect;
}

export const SelectDepartments = ({
  disabled,
  departments,
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
    <SelectMultipleDecoupling
      allowClear={allowClear}
      placeholder={placeholder ?? t('department:department')}
      disabled={disabled}
      value={departments}
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
