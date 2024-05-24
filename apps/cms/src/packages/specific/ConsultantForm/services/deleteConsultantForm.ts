import { ConsultantForm } from '../models/ConsultantForm';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface DeleteConsultantForm {
  id: ConsultantForm['id'];
}

export const deleteConsultantForm = async ({ id }: DeleteConsultantForm) => {
  const response = await fetchApi.request({
    method: 'DELETE',
    url: `/consultation-forms/${id}`,
  });
  return response.data;
};
