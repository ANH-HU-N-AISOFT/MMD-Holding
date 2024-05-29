import { AxiosResponse } from 'axios';
import { TrialRequest } from '../models/TrialRequest';
import { ServiceHeaderResponse } from '~/@types/ServiceHeaderResponse';
import { DemoType } from '~/packages/common/SelectVariants/DemoType/constants/DemoType';
import { StudyMode } from '~/packages/common/SelectVariants/StudyMode/constants/StudyMode';
import { TrialRequestStatus } from '~/packages/common/SelectVariants/TrialRequestStatus/constants/TrialRequestStatus';
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
    },
  });

  return response.data;
};