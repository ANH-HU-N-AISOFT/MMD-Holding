import { FormValues } from '../components/FormMutation/FormMutation';
import { CreateStudent } from '../services/createStudent';
import { DefaultPassword } from '~/constants/DefaultPassword';

export const formMutationValuesToCreateStudentService = (data: FormValues): CreateStudent => {
  return {
    accessStatus: data.roleSystem.accessStatus,
    organizationIds: data.personalInformation.departments,
    source: data.personalInformation.source ?? null,
    supporterIds: data.personalInformation.saleEmployees ?? null,
    username: data.roleSystem.username,
    password: data.roleSystem.password ?? DefaultPassword,

    // Student
    address: data.personalInformation.studentCurrentAddress ?? null,
    birthday: data.personalInformation.studentDateOfBirth ?? null,
    districtId: data.personalInformation.studentDistrict ?? null,
    email: data.personalInformation.studentEmail ?? null,
    fullName: data.personalInformation.studentName,
    gender: data.personalInformation.studentGender ?? null,
    identityCardDate: data.personalInformation.studentCitizenIdCardCreatedAt ?? null,
    identityCardNo: data.personalInformation.studentCitizenIdCard ?? null,
    identityCardPlace: data.personalInformation.studentResidenceAddress ?? null,
    permanentAddress: data.personalInformation.studentResidenceAddress ?? null,
    phoneNumber: data.personalInformation.studentPhone,
    provinceId: data.personalInformation.studentCity ?? null,
    schoolId: data.personalInformation.studentSchool ?? null,

    // Parent
    parentBirthday: data.personalInformation.parentDateOfBirth ?? null,
    parentFullName: data.personalInformation.parentName ?? null,
    parentGender: data.personalInformation.parentGender ?? null,
    parentIdentityCardDate: data.personalInformation.parentCitizenIdCardCreatedAt ?? null,
    parentIdentityCardNo: data.personalInformation.parentCitizenIdCard ?? null,
    parentIdentityCardPlace: data.personalInformation.parentCitizenIdCardCreatedWhere ?? null,
    parentPermanentAddress: data.personalInformation.parentResidenceAddress ?? null,
    parentPhoneNumber: data.personalInformation.parentPhone ?? null,
    notifyParentsOfResults: data.personalInformation.notifyResultToParent ?? null,
  };
};
