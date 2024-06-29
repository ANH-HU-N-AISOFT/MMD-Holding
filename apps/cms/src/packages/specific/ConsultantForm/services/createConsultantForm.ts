import { ConsultantForm } from '../models/ConsultantForm';
import { FormStatus } from '../models/FormStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateConsultantForm {
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
}

export type ResponseSuccess = ConsultantForm;

export const createConsultantForm = async (data: CreateConsultantForm) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/consultation-forms',
    data: data,
  });
  return response.data;
};
