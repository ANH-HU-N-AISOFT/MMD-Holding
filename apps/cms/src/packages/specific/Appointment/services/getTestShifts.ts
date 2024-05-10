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
}

export const getTestShifts = async ({ appointmentDate, query }: GetTestShifts) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/appointments/testing-shift',
    params: {
      appointmentDate,
      query,
    },
  });
  return response.data;
};
