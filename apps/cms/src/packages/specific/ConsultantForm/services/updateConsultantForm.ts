import { ConsultantForm } from '../models/ConsultantForm';
import { FormStatus } from '../models/FormStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UpdateConsultantForm {
  id: ConsultantForm['id'];
  data: {
    id: string;
    studentId: string;
    consultantId: string;
    learningOrganizationId: string;
    status: FormStatus | null;
    courseRoadmapId: string | null;
    courseComboId: string | null;
    promotionIds: string[] | null;
    giftIds: string[];
    notes: string | null;
    examResults: string[] | null;
  };
}

export interface ResponseSuccess {}

export const updateConsultantForm = async ({ data, id }: UpdateConsultantForm) => {
  const response = await fetchApi.request({
    method: 'PUT',
    url: `/consultation-forms/${id}`,
    data: data,
  });
  return response.data;
};
