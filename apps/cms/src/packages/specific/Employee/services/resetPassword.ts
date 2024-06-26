import { Employee } from '../../Employee/models/Employee';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResetPassword {
  employeeId: Employee['employeeId'];
  newPassword: string;
}

export const resetPassword = async ({ employeeId, newPassword }: ResetPassword) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: `/employees/reset-password`,
    data: {
      employeeId: employeeId,
      newPassword,
    },
  });
  return response.data;
};
