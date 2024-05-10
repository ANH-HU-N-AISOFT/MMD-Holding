import { Appointment } from '../models/Appointment';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteAppointment {
  id: Appointment['id'];
}

export const deleteAppointment = async ({ id }: DeleteAppointment) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/appointments/${id}`,
  });
  return response.data;
};
