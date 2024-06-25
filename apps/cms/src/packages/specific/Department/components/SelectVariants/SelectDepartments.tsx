import { prop, uniqBy } from 'ramda';
import { useTranslation } from 'react-i18next';
import { SelectMultipleDecoupling, SelectMultipleDecouplingProps } from 'reactjs';
import { GetAllParams } from '~/constants/GetAllParams';
import { Department } from '~/packages/specific/Department/models/Department';
import { getDepartments } from '~/packages/specific/Department/services/getDepartments';

export type DepartmentFields = Pick<Department, 'id' | 'code' | 'name'>;
interface Props {
  departments?: Array<DepartmentFields['id']>;
  onChange?: SelectMultipleDecouplingProps<DepartmentFields, Array<DepartmentFields['id']>>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  fieldValue?: keyof Pick<DepartmentFields, 'id' | 'code'>;
  fieldLabel?: Array<keyof Pick<DepartmentFields, 'name' | 'code'>>;
  extraDepartments: DepartmentFields[];
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
}: Props) => {
  const { t } = useTranslation(['department']);

  return (
    <SelectMultipleDecoupling
      allowClear={allowClear}
      placeholder={placeholder ?? t('department:department')}
      disabled={disabled}
      value={departments}
      onChange={onChange}
      service={async () => {
        const response = await getDepartments({
          ...GetAllParams,
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
