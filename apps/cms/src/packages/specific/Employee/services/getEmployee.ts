import { AxiosResponse } from 'axios';
import { Employee } from '../models/Employee';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = Employee;

interface GetEmployee {
  id: Employee['employeeId'];
}

export const getEmployee = async ({ id }: GetEmployee) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/employees/${id}`,
  });
  return response.data;
};
