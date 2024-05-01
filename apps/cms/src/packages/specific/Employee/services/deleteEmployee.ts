import { Employee } from '../models/Employee';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteEmployee {
  id: Employee['id'];
}

export const deleteEmployee = async ({ id }: DeleteEmployee) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/employees/${id}`,
  });
  return response.data;
};
