import { Employee } from '../../Employee/models/Employee';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteEmployee {
  employeeId: Employee['employeeId'];
  newPassword: string;
}

export const resetPassword = async ({ employeeId, newPassword }: DeleteEmployee) => {
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
