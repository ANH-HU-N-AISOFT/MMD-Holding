import { AxiosResponse } from 'axios';
import { ConsultantForm } from '../models/ConsultantForm';
import { FormStatus } from '../models/FormStatus';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
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
  studentId?: string;
}
export const getConsultantForms = async ({
  page,
  query,
  perPage,
  sortByName,
  courseRoadmapId,
  status,
  studentId,
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
      studentId,
    },
  });

  return response.data;
};
