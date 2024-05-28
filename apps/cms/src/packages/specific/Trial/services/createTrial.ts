import { Trial } from '../models/Trial';
import { ClassType } from '~/packages/common/SelectVariants/ClassType/constants/ClassType';
import { LearningType } from '~/packages/common/SelectVariants/LearningType/constants/LearningType';
import { TrialStatus } from '~/packages/common/SelectVariants/TrialStatus/constants/TrialStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

export interface CreateTrial {
  studentId: string | undefined | null;
  consultantId: string | undefined | null;
  status: TrialStatus;
  classType: ClassType;
  courseRoadmapId: string | undefined | null;
  learningOrganizationId: string | undefined | null;
  learningDate: string | undefined | null;
  learningTime: string | undefined | null;
  learningType: LearningType;
  adminId?: string | undefined | null;
  lectureId?: string | undefined | null;
  notes: string | undefined | null;
}

export type ResponseSuccess = Trial;

export const createTrial = async (data: CreateTrial) => {
  const response = await fetchApi.request({
    method: 'POST',
    url: '/trials',
    data: data,
  });
  return response.data;
};
