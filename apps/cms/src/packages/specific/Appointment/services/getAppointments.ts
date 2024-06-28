import { AxiosResponse } from 'axios';
import { Appointment } from '../models/Appointment';
import { AppointmentStatus } from '../models/AppointmentStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: Appointment[];
  totalsByStatus: Record<AppointmentStatus, number>;
  total: number;
}

interface GetAppointments {
  query?: string;
  page?: number;
  perPage?: number;
  sortByDate?: 1 | -1;
  status?: AppointmentStatus;
  isOwner?: boolean;
  organizationIds?: string[];
  studentId?: string;
}
export const getAppointments = async ({
  page,
  query,
  perPage,
  isOwner,
  organizationIds,
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
      organizationIds,
      sortByDate,
      status,
      studentId,
    },
  });

  return response.data;
};
