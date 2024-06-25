import { Appointment } from '../models/Appointment';
import { AppointmentStatus } from '../models/AppointmentStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

interface UpdateAppointmentStatus {
  status: AppointmentStatus;
  id: Appointment['id'];
}

export const updateAppointmentStatus = async ({ id, status }: UpdateAppointmentStatus) => {
  const response = await fetchApi.request({
    url: `/appointments/status/${id}`,
    method: 'PUT',
    data: { status },
  });
  return response.data;
};
