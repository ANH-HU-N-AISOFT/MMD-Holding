import { FormValues } from '../components/FormMutation/FormMutation';

export const formMutationValuesToCreateStudentService = (data: FormValues) => {
  return {
    accessStatus: data.roleSystem.accessStatus,
    address: data.personalInformation.currentAddress ?? undefined,
    birthday: data.personalInformation.dateOfBirth ?? undefined,
    districtId: data.personalInformation.district ?? undefined,
    email: data.personalInformation.email ?? undefined,
    fullName: data.personalInformation.fullName,
    gender: data.personalInformation.gender ?? undefined,
    notifyParentsOfResults: data.personalInformation.notifyResultToParent ?? undefined,
    organizationIds: data.personalInformation.departments,
    parentPhoneNumber: data.personalInformation.parentPhone ?? undefined,
    password: data.roleSystem.password as string,
    phoneNumber: data.personalInformation.phone,
    schoolId: data.personalInformation.school ?? undefined,
    source: data.personalInformation.source ?? undefined,
    supporterIds: data.personalInformation.saleEmployees ?? undefined,
    username: data.roleSystem.username,
    provinceId: data.personalInformation.city ?? undefined,
  };
};
