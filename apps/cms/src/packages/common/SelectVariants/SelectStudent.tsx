import { useTranslation } from 'react-i18next';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
import { GetAllParams } from '~/constants/GetAllParams';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudents } from '~/packages/specific/Student/services/getStudents';

interface Props {
  student?: Student['id'];
  onChange?: SelectSingleDecouplingProps<Student, Student['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}

// FIXME: Chưa có rule filter
export const SelectStudent = ({ disabled, student, allowClear = true, placeholder, onChange }: Props) => {
  const { t } = useTranslation(['student']);

  return (
    <SelectSingleDecoupling<Student, Student['id']>
      allowClear={allowClear}
      placeholder={placeholder ?? t('student:student')}
      disabled={disabled}
      value={student}
      onChange={onChange}
      service={async () => {
        const response = await getStudents({
          ...GetAllParams,
          sortByName: 1,
        });
        return response.items;
      }}
      transformToOption={student => {
        return {
          label: student.fullName,
          searchValue: student.fullName,
          value: student.id,
          rawData: student,
        };
      }}
      className="w-full"
    />
  );
};
