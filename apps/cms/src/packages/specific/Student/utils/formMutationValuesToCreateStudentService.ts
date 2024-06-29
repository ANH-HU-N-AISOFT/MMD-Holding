import { FormValues } from '../components/FormMutation/FormMutation';
import { CreateStudent } from '../services/createStudent';
import { DefaultPassword } from '~/constants/DefaultPassword';

export const formMutationValuesToCreateStudentService = (data: FormValues): CreateStudent => {
  return {
    accessStatus: data.roleSystem.accessStatus,
    organizationIds: data.personalInformation.departments,
    source: data.personalInformation.source ?? undefined,
    supporterIds: data.personalInformation.saleEmployees ?? undefined,
    username: data.roleSystem.username,
    password: data.roleSystem.password ?? DefaultPassword,

    // Student
    address: data.personalInformation.studentCurrentAddress ?? undefined,
    birthday: data.personalInformation.studentDateOfBirth ?? undefined,
    districtId: data.personalInformation.studentDistrict ?? undefined,
    email: data.personalInformation.studentEmail ?? undefined,
    fullName: data.personalInformation.studentName,
    gender: data.personalInformation.studentGender ?? undefined,
    identityCardDate: data.personalInformation.studentCitizenIdCardCreatedAt,
    identityCardNo: data.personalInformation.studentCitizenIdCard,
    identityCardPlace: data.personalInformation.studentResidenceAddress,
    permanentAddress: data.personalInformation.studentResidenceAddress,
    phoneNumber: data.personalInformation.studentPhone,
    provinceId: data.personalInformation.studentCity ?? undefined,
    schoolId: data.personalInformation.studentSchool ?? undefined,

    // Parent
    parentBirthday: data.personalInformation.parentDateOfBirth,
    parentFullName: data.personalInformation.parentName,
    parentGender: data.personalInformation.parentGender,
    parentIdentityCardDate: data.personalInformation.parentCitizenIdCardCreatedAt,
    parentIdentityCardNo: data.personalInformation.parentCitizenIdCard,
    parentIdentityCardPlace: data.personalInformation.parentCitizenIdCardCreatedWhere,
    parentPermanentAddress: data.personalInformation.parentResidenceAddress,
    parentPhoneNumber: data.personalInformation.parentPhone ?? undefined,
    notifyParentsOfResults: data.personalInformation.notifyResultToParent ?? undefined,
  };
};
