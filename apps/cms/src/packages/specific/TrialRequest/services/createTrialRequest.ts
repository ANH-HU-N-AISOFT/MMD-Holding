import { DemoType } from '../models/DemoType';
import { StudyMode } from '../models/StudyMode';
import { TrialRequest } from '../models/TrialRequest';
import { TrialRequestStatus } from '../models/TrialRequestStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateTrialRequest {
  studentId: string;
  consultantId: string;
  status: TrialRequestStatus;
  demoType: DemoType;
  courseRoadmapId: string;
  learningOrganizationId: string;
  studyDate: string | null;
  studyTime: string | null;
  studyMode: StudyMode;
  lecturerId: string | null;
  adminId: string | null;
  notes: string | null;
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
