import { useTranslation } from 'react-i18next';
import { SelectSingleDecoupling, SelectSingleDecouplingProps } from 'reactjs';
import { GetAllParams } from '~/constants/GetAllParams';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudents } from '~/packages/specific/Student/services/getStudents';

interface Props {
  student?: Student['id'];
  onChange?: SelectSingleDecouplingProps<Student, Student['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  label?: (student: Student) => string;
}

export const SelectStudent = ({ disabled, student, allowClear = true, placeholder, onChange, label }: Props) => {
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
        const display = label ? label(student) : [student.fullName, student.phoneNumber].filter(Boolean).join(' - ');
        return {
          label: display,
          searchValue: display,
          value: student.id,
          rawData: student,
        };
      }}
      className="w-full"
    />
  );
};
