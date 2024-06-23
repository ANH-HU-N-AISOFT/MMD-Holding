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
  department?: DepartmentFields['id'];
  onChange?: SelectSingleDecouplingProps<DepartmentFields, DepartmentFields['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  fieldValue?: keyof Pick<DepartmentFields, 'id' | 'code'>;
  fieldLabel?: Array<keyof Pick<DepartmentFields, 'name' | 'code'>>;
  extraDepartments: DepartmentFields[];
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
}: Props) => {
  const { t } = useTranslation(['employee']);

  return (
    <SelectSingleDecoupling<DepartmentFields, DepartmentFields['id']>
      allowClear={allowClear}
      placeholder={placeholder ?? t('employee:department')}
      disabled={disabled}
      value={department}
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
