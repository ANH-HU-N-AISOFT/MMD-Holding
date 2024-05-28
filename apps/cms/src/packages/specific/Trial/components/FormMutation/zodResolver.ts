import { zodResolver } from '@hookform/resolvers/zod';
import { array, enum as enum_, literal, object, string } from 'zod';
import type { TFunction } from 'i18next';
import { ClassType } from '~/packages/common/SelectVariants/ClassType/constants/ClassType';
import { LearningType } from '~/packages/common/SelectVariants/LearningType/constants/LearningType';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';
import { TrialStatus } from '~/packages/common/SelectVariants/TrialStatus/constants/TrialStatus';
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
        TrialStatus.Cancelled,
        TrialStatus.ClassAssigned,
        TrialStatus.Finished,
        TrialStatus.TrialClass,
        TrialStatus.WaitingForClass,
      ],
      { required_error: status.required },
    ),

    classType: enum_([ClassType.AvailableClass, ClassType.PrivateClass], { required_error: classType.required }),
    courseRoadmapId: string({ required_error: courseRoadmapId.required }),
    learningOrganizationId: string({ required_error: learningOrganizationId.required }),
    learningDate: string().optional().nullable(),
    learningTime: string().optional().nullable(),
    learningType: enum_([LearningType.OFFLINE, LearningType.ONLINE]),
    adminId: string().optional(),
    lectureId: string().optional(),
    notes: string().trim().min(0, notes.length).max(256, notes.length).trim().optional().or(literal('')).nullable(),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'trial']>) => {
  return zodResolver(getFormMutationSchema(t));
};
