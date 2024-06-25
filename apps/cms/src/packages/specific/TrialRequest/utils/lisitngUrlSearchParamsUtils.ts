import { UrlSearchParamsUtils } from 'utilities';
import { any, boolean, enum as enum_, number, object, string } from 'zod';
import { DemoType } from '../models/DemoType';
import { StudyMode } from '../models/StudyMode';
import { TrialRequestStatus } from '../models/TrialRequestStatus';

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
