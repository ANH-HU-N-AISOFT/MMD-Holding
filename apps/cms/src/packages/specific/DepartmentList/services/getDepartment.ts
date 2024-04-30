import { AxiosResponse } from 'axios';
import { BusinessStatusEnum, CapHanhChinh, Department } from '../models/Department';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  name: string;
  code: string;
  managementUnitId: string;
  businessStatus: BusinessStatusEnum;
  level: CapHanhChinh;
  address: string;
  province: string;
  phoneNumber: string;
  email: string;
  unitManagerId: string;
  foundationDate: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  managementUnit?: {
    _id: string;
    _deleted: boolean;
    name: string;
    code: string;
    businessStatus: BusinessStatusEnum;
    level: CapHanhChinh;
    address: string;
    province: string;
    phoneNumber: string;
    email: string;
    foundationDate: string;
    companyId: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  unitManager?: {
    fullName: string;
    email: string;
    id: string;
  };
}

interface GetDepartment {
  id: Department['id'];
}

export const getDepartment = async ({ id }: GetDepartment) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/organizations/${id}`,
  });
  return response.data;
};
