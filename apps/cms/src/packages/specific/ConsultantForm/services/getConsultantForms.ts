import { AxiosResponse } from 'axios';
import { ConsultantForm } from '../models/ConsultantForm';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { FormStatus } from '~/packages/common/SelectVariants/FormStatus/constants/FormStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: ConsultantForm[];
  headers: ServiceHeaderResponse;
}

interface GetConsultantForms {
  page?: number;
  perPage?: number;
  sortByName?: -1 | 1;
  query?: string;
  status?: FormStatus;
  courseRoadmapId?: string;
}
export const getConsultantForms = async ({
  page,
  query,
  perPage,
  sortByName,
  courseRoadmapId,
  status,
}: GetConsultantForms) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/consultation-forms',
    params: {
      page,
      query,
      perPage,
      sortByName,
      courseRoadmapId,
      status,
    },
  });

  return response.data;
};
