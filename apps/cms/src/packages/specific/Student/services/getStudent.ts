import { AxiosResponse } from 'axios';
import { Student } from '../models/Student';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = Student;

interface GetStudent {
  id: Student['id'];
}

export const getStudent = async ({ id }: GetStudent) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/students/${id}`,
  });
  return response.data;
};
