import { Student } from '../../models/Student';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  student: Student;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
  onResetPassword?: () => void;
}

export const Edit = ({ student, onResetPassword, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
      onResetPassword={onResetPassword}
      needPasswordValidation={false}
      defaultValues={{
        personalInformation: {
          city: student.province?.id,
          currentAddress: student.address,
          dateOfBirth: student.birthday,
          departments: student.organizationIds,
          district: student.district?.id,
          email: student.email,
          fullName: student.fullName,
          gender: student.gender,
          notifyResultToParent: student.notifyParentsOfResults,
          parentPhone: student.parentPhoneNumber,
          phone: student.phoneNumber,
          saleEmployees: student.supporterIds ?? [],
          school: student.school,
          source: student.source,
        },
        roleSystem: {
          accessStatus: student.user?.accessStatus,
          username: student.user?.userName,
          password: '********',
        },
      }}
    />
  );
};
