import { UrlSearchParamsUtils } from 'utilities';
import { any, enum as enum_, number, object, string } from 'zod';
import { ClassType } from '~/packages/common/SelectVariants/ClassType/constants/ClassType';
import { LearningType } from '~/packages/common/SelectVariants/LearningType/constants/LearningType';
import { TrialStatus } from '~/packages/common/SelectVariants/TrialStatus/constants/TrialStatus';

export const lisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: any().optional(),
  status: enum_([
    TrialStatus.Cancelled,
    TrialStatus.ClassAssigned,
    TrialStatus.Finished,
    TrialStatus.TrialClass,
    TrialStatus.WaitingForClass,
  ]).optional(),
  courseRoadmapId: string().optional(),
  classType: enum_([ClassType.AvailableClass, ClassType.PrivateClass]).optional(),
  learningType: enum_([LearningType.OFFLINE, LearningType.ONLINE]).optional(),
  departmentId: string().optional(),
  consultantorId: string().optional(),
  adminId: string().optional(),
  lectureId: string().optional(),
});

export const lisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: lisitngUrlSearchParamsSchema,
});
