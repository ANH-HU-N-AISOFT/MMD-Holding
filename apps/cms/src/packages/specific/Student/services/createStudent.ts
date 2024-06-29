import { SourceEnum } from '../models/SourceEnum';
import { Student } from '../models/Student';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { SystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateStudent {
  fullName: string;
  phoneNumber: string;
  address: string | null;
  provinceId: string | null;
  districtId: string | null;
  email: string | null;
  birthday: string | null;
  schoolId: string | null;
  gender: GenderEnum | null;
  parentPhoneNumber: string | null;
  notifyParentsOfResults: boolean | null;
  source: SourceEnum | null;
  organizationIds: string[];
  supporterIds: string[] | null;
  username: string;
  password: string;
  accessStatus: SystemAccessStatus;
  identityCardNo: string | null;
  identityCardDate: string | null;
  identityCardPlace: string | null;
  permanentAddress: string | null;
  parentFullName: string | null;
  parentGender: GenderEnum | null;
  parentBirthday: string | null;
  parentIdentityCardNo: string | null;
  parentIdentityCardDate: string | null;
  parentIdentityCardPlace: string | null;
  parentPermanentAddress: string | null;
}

export type ResponseSuccess = Student;

export const createStudent = async (data: CreateStudent) => {
  const response = await fetchApi.request<ResponseSuccess>({
    method: 'POST',
    url: '/students',
    data: data,
  });
  return response.data;
};
