import { ConsultantForm } from '../models/ConsultantForm';
import { FormStatus } from '~/packages/common/SelectVariants/FormStatus/constants/FormStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UpdateConsultantForm {
  id: ConsultantForm['id'];
  data: {
    id: string;
    studentId: string;
    consultantId: string;
    learningOrganizationId: string;
    status: FormStatus | undefined | null;
    courseRoadmapId: string | undefined | null;
    courseComboId: string | undefined | null;
    promotionIds: string[];
    giftIds: string[];
    notes: string | undefined | null;
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
