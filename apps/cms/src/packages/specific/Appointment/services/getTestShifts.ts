import { AxiosResponse } from 'axios';
import { fetchApi } from '~/utils/functions/fetchApi';

type ResponseSuccess = Array<{
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  session: string;
  totalAppointments: number;
}>;

interface GetTestShifts {
  query?: string;
  appointmentDate?: string;
  testOrganizationId?: string;
}

export const getTestShifts = async ({ appointmentDate, testOrganizationId, query }: GetTestShifts) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/appointments/testing-shift',
    params: {
      appointmentDate,
      query,
      testOrganizationId,
    },
  });
  return response.data;
};
