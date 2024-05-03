import { Student } from '../models/Student';
import { EmployeeAccessStatus } from '~/packages/common/SelectVariants/EmployeeAccessStatus/constants/EmployeeAccessStatus';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UpdateStudent {
  id: Student['id'];
  data: {
    id: Student['id'];
    fullName: string;
    phoneNumber: string;
    address?: string;
    provinceId?: string;
    districtId?: string;
    email?: string;
    birthday?: string;
    schoolId?: string;
    gender?: GenderEnum;
    parentPhone?: string;
    notifyParentsOfResults?: boolean;
    source?: SourceEnum;
    organizationIds: string[];
    supporterIds?: string[];
    username: string;
    password: string;
    accessStatus: EmployeeAccessStatus;
  };
}

export interface ResponseSuccess {}

export const updateStudent = async ({ data, id }: UpdateStudent) => {
  const response = await fetchApi.request({
    method: 'PUT',
    url: `/students/${id}`,
    data: data,
  });
  return response.data;
};
