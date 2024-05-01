import { Department } from '../models/Department';
import { fetchApi } from '~/utils/functions/fetchApi';
import { removeEmptyStringKeys } from '~/utils/functions/removeEmptyStringKeys';

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

export type ResponseSuccess = Department;

export const createDepartment = async (data: CreateDepartment) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/organizations',
    data: removeEmptyStringKeys(data),
  });
  return response.data;
};
