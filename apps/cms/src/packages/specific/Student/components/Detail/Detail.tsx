import { nth } from 'ramda';
import { Student } from '../../models/Student';
import { FormMutation } from '../FormMutation/FormMutation';

interface Props {
  student: Student;
}

export const Detail = ({ student }: Props) => {
  return (
    <FormMutation
      hidePasswordField
      isSubmiting={false}
      uid=""
      disabled
      defaultValues={{
        personalInformation: {
          city: student.province?.id,
          currentAddress: student.address,
          dateOfBirth: student.birthday,
          department: nth(0, student.organizationIds ?? []),
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
        },
      }}
    />
  );
};
