import { UrlSearchParamsUtils } from 'utilities';
import { any, boolean, enum as enum_, number, object, string } from 'zod';
import { DemoType } from '~/packages/common/SelectVariants/DemoType/constants/DemoType';
import { StudyMode } from '~/packages/common/SelectVariants/StudyMode/constants/StudyMode';
import { TrialRequestStatus } from '~/packages/common/SelectVariants/TrialRequestStatus/constants/TrialRequestStatus';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  status: enum_([
    TrialRequestStatus.Assigned,
    TrialRequestStatus.Awaiting,
    TrialRequestStatus.Canceled,
    TrialRequestStatus.Completed,
    TrialRequestStatus.InProgress,
  ]).optional(),
  courseRoadmapId: string().optional(),
  classType: enum_([DemoType.AvailableClass, DemoType.PrivateClass]).optional(),
  learningType: enum_([StudyMode.Offline, StudyMode.Online]).optional(),
  departmentId: string().optional(),
  isAdminOwner: boolean().optional(),
  isConsultantOwner: boolean().optional(),
  isLecturerOwner: boolean().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
