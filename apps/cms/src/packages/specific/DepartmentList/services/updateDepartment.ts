import { Department } from '../models/Department';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UpdateDepartment {
  id: Department['id'];
  data: {
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
  };
}

export interface ResponseSuccess {}

export const updateDepartment = async ({ data, id }: UpdateDepartment) => {
  const response = await fetchApi.request({
    method: 'PUT',
    url: `/organizations/${id}`,
    data,
  });
  return response.data;
};
