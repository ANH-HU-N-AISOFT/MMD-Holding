import { AxiosResponse } from 'axios';
import { Department } from '../models/Department';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = Department;

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
