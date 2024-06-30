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
      student={student}
      isEdit
      onResetPassword={onResetPassword}
      needPasswordValidation={false}
      defaultValues={{
        personalInformation: {
          departments: student.organizationIds,
          saleEmployees: student.supporterIds ?? [],
          source: student.source,

          // Student
          studentCity: student.province?.id,
          studentCurrentAddress: student.address,
          studentDateOfBirth: student.birthday,
          studentDistrict: student.district?.id,
          studentEmail: student.email,
          studentGender: student.gender,
          studentName: student.fullName,
          studentPhone: student.phoneNumber,
          studentSchool: student.school?.id,
          studentCitizenIdCard: student.identityCardNo,
          studentCitizenIdCardCreatedAt: student.identityCardDate,
          studentCitizenIdCardCreatedWhere: student.identityCardPlace,
          studentResidenceAddress: student.permanentAddress,

          // Parent
          notifyResultToParent: student.notifyParentsOfResults,
          parentPhone: student.parentPhoneNumber,
          parentCitizenIdCard: student.parentIdentityCardNo,
          parentCitizenIdCardCreatedAt: student.parentIdentityCardDate,
          parentCitizenIdCardCreatedWhere: student.parentIdentityCardPlace,
          parentDateOfBirth: student.parentBirthday,
          parentGender: student.parentGender,
          parentName: student.parentFullName,
          parentResidenceAddress: student.parentPermanentAddress,
        },
        roleSystem: {
          accessStatus: student.user?.accessStatus,
          username: student.user?.userName,
        },
        temporaryOptional: {
          cityCode: student.province?.code,
        },
      }}
    />
  );
};
