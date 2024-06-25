import { AxiosResponse } from 'axios';
import { Appointment } from '../models/Appointment';
import { AppointmentStatus } from '../models/AppointmentStatus';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Appointment[];
  headers: ServiceHeaderResponse;
  totalsByStatus: Record<AppointmentStatus, number>;
}

interface GetAppointments {
  query?: string;
  page?: number;
  perPage?: number;
  sortByDate?: 1 | -1;
  status?: AppointmentStatus;
  isOwner?: boolean;
  organizationId?: string;
  studentId?: string;
}
export const getAppointments = async ({
  page,
  query,
  perPage,
  isOwner,
  organizationId,
  sortByDate,
  status,
  studentId,
}: GetAppointments) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/appointments',
    params: {
      page,
      query,
      perPage,
      isOwner,
      organizationId,
      sortByDate,
      status,
      studentId,
    },
  });

  return response.data;
};
