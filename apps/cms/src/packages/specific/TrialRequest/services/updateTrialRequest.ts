import { TrialRequest } from '../models/TrialRequest';
import { DemoType } from '~/packages/common/SelectVariants/DemoType/constants/DemoType';
import { StudyMode } from '~/packages/common/SelectVariants/StudyMode/constants/StudyMode';
import { TrialRequestStatus } from '~/packages/common/SelectVariants/TrialRequestStatus/constants/TrialRequestStatus';
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
    studyDate: string | undefined | null;
    studyTime: string | undefined | null;
    studyMode: StudyMode;
    lecturerId: string | undefined | null;
    adminId: string | undefined | null;
    notes: string | undefined | null;
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
