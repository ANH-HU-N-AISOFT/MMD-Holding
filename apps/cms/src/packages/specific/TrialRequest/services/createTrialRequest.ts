import { TrialRequest } from '../models/TrialRequest';
import { DemoType } from '~/packages/common/SelectVariants/DemoType/constants/DemoType';
import { StudyMode } from '~/packages/common/SelectVariants/StudyMode/constants/StudyMode';
import { TrialRequestStatus } from '~/packages/common/SelectVariants/TrialRequestStatus/constants/TrialRequestStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateTrialRequest {
  studentId: string;
  consultantId: string;
  status: TrialRequestStatus;
  demoType: DemoType;
  courseRoadmapId: string;
  learningOrganizationId: string;
  studyDate: string | undefined | null;
  studyTime: string | undefined | null;
  studyMode: StudyMode;
  lecturerId: string | undefined | null;
  adminId: string | undefined | null;
  notes: string | undefined | null;
}

export type ResponseSuccess = TrialRequest;

export const createTrialRequest = async (data: CreateTrialRequest) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/trial-requests',
    data: data,
  });
  return response.data;
};
