import { DemoType } from '../models/DemoType';
import { StudyMode } from '../models/StudyMode';
import { TrialRequestStatus } from '../models/TrialRequestStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

interface ExportTrialRequests {
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

export const exportTrialRequests = async ({ query, courseRoadmapId, status, studentId }: ExportTrialRequests) => {
  const response = await fetchApi.request({
    url: '/trial-requests/export',
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
