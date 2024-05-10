import { AxiosResponse } from 'axios';
import { Appointment } from '../models/Appointment';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = Appointment;

interface GetAppointment {
  id: Appointment['id'];
}

export const getAppointment = async ({ id }: GetAppointment) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/appointments/${id}`,
  });
  return response.data;
};
