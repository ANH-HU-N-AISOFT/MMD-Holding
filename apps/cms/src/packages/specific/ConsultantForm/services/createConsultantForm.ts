import { ConsultantForm } from '../models/ConsultantForm';
import { FormStatus } from '~/packages/common/SelectVariants/FormStatus/constants/FormStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateConsultantForm {
  studentId: string;
  consultantId: string;
  learningOrganizationId: string;
  status: FormStatus | undefined | null;
  courseRoadmapId: string | undefined | null;
  courseComboId: string | undefined | null;
  promotionIds: string[] | undefined | null;
  giftIds: string[];
  notes: string | undefined | null;
  examResults: string[];
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
