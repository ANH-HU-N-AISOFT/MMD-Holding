import { FormStatus } from '../models/FormStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportConsultantForms {
  query?: string;
  status?: FormStatus;
  courseRoadmapId?: string;
  studentId?: string;
}

export const exportConsultantForms = async ({ query, courseRoadmapId, status, studentId }: ExportConsultantForms) => {
  const response = await fetchApi.request({
    url: '/consultation-forms/export',
    responseType: 'blob',
    params: {
      query,
      courseRoadmapId,
      status,
      studentId,
    },
  });
  return response.data;
};
