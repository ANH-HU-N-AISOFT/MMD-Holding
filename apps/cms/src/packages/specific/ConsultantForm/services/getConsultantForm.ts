import { AxiosResponse } from 'axios';
import { ConsultantForm } from '../models/ConsultantForm';
import { fetchApi } from '~/utils/functions/fetchApi';

export type ResponseSuccess = ConsultantForm;

interface GetConsultantForm {
  id: ConsultantForm['id'];
}

export const getConsultantForm = async ({ id }: GetConsultantForm) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    method: 'GET',
    url: `/consultation-forms/${id}`,
  });
  return response.data;
};
