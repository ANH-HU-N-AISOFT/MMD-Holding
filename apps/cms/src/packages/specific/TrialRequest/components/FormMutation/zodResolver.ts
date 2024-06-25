import { zodResolver } from '@hookform/resolvers/zod';
import { array, enum as enum_, literal, object, string } from 'zod';
import { DemoType } from '../../models/DemoType';
import { StudyMode } from '../../models/StudyMode';
import { TrialRequestStatus } from '../../models/TrialRequestStatus';
import type { TFunction } from 'i18next';
import { SourceEnum } from '~/packages/specific/Student/models/SourceEnum';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';

export const getFormMutationSchema = (t: TFunction<['common', 'trial_request']>) => {
  const studentId = {
    required: getRequiredMessageSelectField(t, 'trial_request:student'),
  };
  const consultantId = {
    required: getRequiredMessageSelectField(t, 'trial_request:consultantor'),
  };
  const courseRoadmapId = {
    required: getRequiredMessageSelectField(t, 'trial_request:course_roadmap'),
  };
  const learningOrganizationId = {
    required: getRequiredMessageSelectField(t, 'trial_request:expect_department'),
  };
  const status = {
    required: getRequiredMessageSelectField(t, 'trial_request:status'),
  };
  const classType = {
    required: getRequiredMessageSelectField(t, 'trial_request:class_type'),
  };
  const notes = {
    length: getRangeLengthMessage(t, 'trial_request:notes', 0, 256),
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

export const getFormMutationResolver = (t: TFunction<['common', 'trial_request']>) => {
  return zodResolver(getFormMutationSchema(t));
};
