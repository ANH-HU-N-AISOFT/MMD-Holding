import { SourceEnum } from '../models/SourceEnum';
import { Student } from '../models/Student';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { SystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateStudent {
  fullName: string;
  phoneNumber: string;
  address: string | undefined | null;
  provinceId: string | undefined | null;
  districtId: string | undefined | null;
  email: string | undefined | null;
  birthday: string | undefined | null;
  schoolId: string | undefined | null;
  gender: GenderEnum | undefined | null;
  parentPhoneNumber: string | undefined | null;
  notifyParentsOfResults: boolean | undefined | null;
  source: SourceEnum | undefined | null;
  organizationIds: string[];
  supporterIds: string[] | undefined | null;
  username: string;
  password: string;
  accessStatus: SystemAccessStatus;
  identityCardNo: string | undefined | null;
  identityCardDate: string | undefined | null;
  identityCardPlace: string | undefined | null;
  permanentAddress: string | undefined | null;
  parentFullName: string | undefined | null;
  parentGender: GenderEnum | undefined | null;
  parentBirthday: string | undefined | null;
  parentIdentityCardNo: string | undefined | null;
  parentIdentityCardDate: string | undefined | null;
  parentIdentityCardPlace: string | undefined | null;
  parentPermanentAddress: string | undefined | null;
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
