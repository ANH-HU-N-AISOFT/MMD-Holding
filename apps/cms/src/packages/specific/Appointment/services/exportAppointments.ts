import { AppointmentStatus } from '../models/AppointmentStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportAppointments {
  query?: string;
  status?: AppointmentStatus;
  isOwner?: boolean;
  organizationIds?: string[];
}

export const exportAppointments = async ({ query, isOwner, organizationIds, status }: ExportAppointments) => {
  const response = await fetchApi.request({
    url: '/appointments/export',
    responseType: 'blob',
    params: { query, isOwner, organizationIds, status },
  });
  return response.data;
};
