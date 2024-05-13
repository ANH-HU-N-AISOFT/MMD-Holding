import { Appointment } from '../models/Appointment';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateAppointment {
  studentId: string;
  status: string;
  testOrganizationId: string;
  demands: string[];
  extraDemand?: string;
  testType: string;
  appointmentDate: string;
  appointmentTime: string;
  test: string;
  testingShiftId: string;
  consultantId: string;
  adminId?: string;
  testerId?: string;
  notes?: string;
}

export type ResponseSuccess = Appointment;

export const createAppointment = async (data: CreateAppointment) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/appointments',
    data: data,
  });
  return response.data;
};
