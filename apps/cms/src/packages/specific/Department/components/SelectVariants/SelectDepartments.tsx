import { prop, uniqBy } from 'ramda';
import { useTranslation } from 'react-i18next';
import { SelectMultipleDecoupling, SelectMultipleDecouplingProps } from 'reactjs';
import { DepartmentPopulated } from '../../models/DepartmentPopulated';
import { GetAllParams } from '~/constants/GetAllParams';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';

interface Props {
  departments: Array<DepartmentPopulated['id']> | undefined;
  onChange:
    | SelectMultipleDecouplingProps<DepartmentPopulated, Array<DepartmentPopulated['id']>>['onChange']
    | undefined;
  disabled: boolean;
  extraDepartments: DepartmentPopulated[];
  scope: 'allSystem' | 'currentUser';
  allowClear?: boolean;
  placeholder?: string;
  fieldValue?: keyof Pick<DepartmentPopulated, 'id' | 'code'>;
  fieldLabel?: Array<keyof Pick<DepartmentPopulated, 'name' | 'code'>>;
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
  scope,
}: Props) => {
  const { t } = useTranslation(['department']);

  return (
    <SelectMultipleDecoupling
      allowClear={allowClear}
      placeholder={placeholder ?? t('department:department')}
      disabled={disabled}
      value={departments}
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
