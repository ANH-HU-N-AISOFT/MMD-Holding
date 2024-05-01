import { Department } from '../models/Department';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteDepartment {
  id: Department['id'];
}

export const deleteDepartment = async ({ id }: DeleteDepartment) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/organizations/${id}`,
  });
  return response.data;
};
