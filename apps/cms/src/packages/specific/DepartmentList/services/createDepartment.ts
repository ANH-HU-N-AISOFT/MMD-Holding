import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateDepartment {
  name: string;
  code: string;
  managementUnitId: string;
  businessStatus: string;
  address: string;
  province: string;
  phoneNumber: string;
  email: string;
  unitManagerId: string;
  foundationDate: string;
}

export interface ResponseSuccess {
  name: string;
  code: string;
  managementUnitId: string;
  businessStatus: string;
  address: string;
  province: string;
  phoneNumber: string;
  email: string;
  unitManagerId: string;
  foundationDate: string;
  id: string;
}

export const createDepartment = async (data: CreateDepartment) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/organizations',
    data,
  });
  return response.data;
};
