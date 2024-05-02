import { Student } from '../models/Student';
import { EmployeeAccessStatus } from '~/packages/common/SelectVariants/EmployeeAccessStatus/constants/EmployeeAccessStatus';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateStudent {
  fullName: string;
  phoneNumber: string;
  address: string;
  provinceId: string;
  districtId: string;
  email: string;
  birthday: string;
  school: string;
  gender: GenderEnum;
  parentPhone: string;
  notifyParentsOfResults: true;
  source: SourceEnum;
  organizationIds: string[];
  supporterIds: string[];
  username: string;
  password: string;
  accessStatus: EmployeeAccessStatus;
}

export type ResponseSuccess = Student;

export const createStudent = async (data: CreateStudent) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/students',
    data: data,
  });
  return response.data;
};
