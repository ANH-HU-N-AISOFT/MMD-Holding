import { DemoType } from '../models/DemoType';
import { StudyMode } from '../models/StudyMode';
import { TrialRequest } from '../models/TrialRequest';
import { TrialRequestStatus } from '../models/TrialRequestStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface UpdateTrialRequest {
  id: TrialRequest['id'];
  data: {
    id: string;
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
  };
}

export interface ResponseSuccess {}

export const updateTrialRequest = async ({ data, id }: UpdateTrialRequest) => {
  const response = await fetchApi.request({
    method: 'PUT',
    url: `/trial-requests/${id}`,
    data: data,
  });
  return response.data;
};
