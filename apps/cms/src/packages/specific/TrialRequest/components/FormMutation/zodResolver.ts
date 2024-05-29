import { zodResolver } from '@hookform/resolvers/zod';
import { array, enum as enum_, literal, object, string } from 'zod';
import type { TFunction } from 'i18next';
import { DemoType } from '~/packages/common/SelectVariants/DemoType/constants/DemoType';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';
import { StudyMode } from '~/packages/common/SelectVariants/StudyMode/constants/StudyMode';
import { TrialRequestStatus } from '~/packages/common/SelectVariants/TrialRequestStatus/constants/TrialRequestStatus';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';

export const getFormMutationSchema = (t: TFunction<['common', 'trial']>) => {
  const studentId = {
    required: getRequiredMessageSelectField(t, 'trial:student'),
  };
  const consultantId = {
    required: getRequiredMessageSelectField(t, 'trial:consultantor'),
  };
  const courseRoadmapId = {
    required: getRequiredMessageSelectField(t, 'trial:course_roadmap'),
  };
  const learningOrganizationId = {
    required: getRequiredMessageSelectField(t, 'trial:expect_department'),
  };
  const status = {
    required: getRequiredMessageSelectField(t, 'trial:status'),
  };
  const classType = {
    required: getRequiredMessageSelectField(t, 'trial:class_type'),
  };
  const notes = {
    length: getRangeLengthMessage(t, 'trial:notes', 0, 256),
  };
  return object({
    studentId: string({ required_error: studentId.required }),
    displayStudentPhone: string().or(literal('')).optional().nullable(),
    displayStudentSchool: string().optional().nullable(),
    displayStudentSource: enum_([
      SourceEnum.Cold,
      SourceEnum.Communication,
      SourceEnum.DataMarketing,
      SourceEnum.HotWarm,
      SourceEnum.HumanResources,
      SourceEnum.Repeat,
    ])
      .optional()
      .nullable(),
    displaySaleEmployees: array(string()).optional().nullable(),
    consultantId: string({ required_error: consultantId.required }),
    status: enum_(
      [
        TrialRequestStatus.Assigned,
        TrialRequestStatus.Awaiting,
        TrialRequestStatus.Canceled,
        TrialRequestStatus.Completed,
        TrialRequestStatus.InProgress,
      ],
      { required_error: status.required },
    ),

    classType: enum_([DemoType.AvailableClass, DemoType.PrivateClass], { required_error: classType.required }),
    courseRoadmapId: string({ required_error: courseRoadmapId.required }),
    learningOrganizationId: string({ required_error: learningOrganizationId.required }),
    learningDate: string().optional().nullable(),
    learningTime: string().optional().nullable(),
    learningType: enum_([StudyMode.Offline, StudyMode.Online]),
    adminId: string().optional(),
    lectureId: string().optional(),
    notes: string().trim().min(0, notes.length).max(256, notes.length).trim().optional().or(literal('')).nullable(),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'trial']>) => {
  return zodResolver(getFormMutationSchema(t));
};
