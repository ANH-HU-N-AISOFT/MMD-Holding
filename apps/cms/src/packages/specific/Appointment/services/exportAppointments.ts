import { AppointmentStatus } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportAppointments {
  query?: string;
  status?: AppointmentStatus;
  isOwner?: boolean;
  organizationId?: string;
}

export const exportAppointments = async ({ query, isOwner, organizationId, status }: ExportAppointments) => {
  const response = await fetchApi.request({
    url: '/appointments/export',
    responseType: 'blob',
    params: { query, isOwner, organizationId, status },
  });
  return response.data;
};
