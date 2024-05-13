import { Student } from '../../Student/models/Student';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResetPassword {
  id: Student['id'];
  newPassword: string;
}

export const resetPassword = async ({ id, newPassword }: ResetPassword) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: `/students/reset-password`,
    data: {
      studentId: id,
      newPassword,
    },
  });
  return response.data;
};
