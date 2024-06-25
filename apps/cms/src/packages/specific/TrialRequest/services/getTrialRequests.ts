import { AxiosResponse } from 'axios';
import { DemoType } from '../models/DemoType';
import { StudyMode } from '../models/StudyMode';
import { TrialRequest } from '../models/TrialRequest';
import { TrialRequestStatus } from '../models/TrialRequestStatus';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface ResponseSuccess {
  items: TrialRequest[];
  headers: ServiceHeaderResponse;
}

interface GetTrialRequests {
  page?: number;
  perPage?: number;
  sortByName?: -1 | 1;
  query?: string;

  status?: TrialRequestStatus;
  demoType?: DemoType;
  studyMode?: StudyMode;
  courseRoadmapId?: string;
  learningOrganizationId?: string;
  isAdminOwner?: boolean;
  isConsultantOwner?: boolean;
  isLecturerOwner?: boolean;
  studentId?: string;
}
export const getTrialRequests = async ({
  page,
  query,
  perPage,
  status,
  sortByName,
  courseRoadmapId,
  demoType,
  isAdminOwner,
  isConsultantOwner,
  isLecturerOwner,
  learningOrganizationId,
  studyMode,
  studentId,
}: GetTrialRequests) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchApi.request({
    url: '/trial-requests',
    params: {
      page,
      query,
      perPage,
      status,
      sortByName,
      courseRoadmapId,
      demoType,
      isAdminOwner,
      isConsultantOwner,
      isLecturerOwner,
      learningOrganizationId,
      studyMode,
      studentId,
    },
  });

  return response.data;
};
