import { Student } from '../models/Student';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteStudent {
  id: Student['id'];
}

export const deleteStudent = async ({ id }: DeleteStudent) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/students/${id}`,
  });
  return response.data;
};
