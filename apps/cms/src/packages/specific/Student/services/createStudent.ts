import { SourceEnum } from '../models/SourceEnum';
import { Student } from '../models/Student';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { SystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateStudent {
  fullName: string;
  phoneNumber: string;
  address?: string;
  provinceId?: string;
  districtId?: string;
  email?: string;
  birthday?: string;
  schoolId?: string;
  gender?: GenderEnum;
  parentPhoneNumber?: string;
  notifyParentsOfResults?: boolean;
  source?: SourceEnum;
  organizationIds: string[];
  supporterIds?: string[];
  username: string;
  password: string;
  accessStatus: SystemAccessStatus;
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
