import { Appointment } from '../models/Appointment';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UpdateAppointment {
  id: Appointment['id'];
  data: {
    studentId: string;
    status: string;
    testOrganizationId: string;
    demands: string[];
    extraDemand: string;
    testType: string;
    appointmentDate: string;
    appointmentTime: string;
    test: string;
    testingShiftId: string;
    consultantId: string;
    adminId: string;
    testerId: string;
    notes: string;
    id: string;
  };
}

export interface ResponseSuccess {}

export const updateAppointment = async ({ data, id }: UpdateAppointment) => {
  const response = await fetchApi.request({
    method: 'PUT',
    url: `/appointments/${id}`,
    data: data,
  });
  return response.data;
};
