import { zodResolver } from '@hookform/resolvers/zod';
import { literal, object, string, enum as enum_, array, number } from 'zod';
import { CourseRoadmapOrCombo } from './constants';
import type { TFunction } from 'i18next';
import { FormStatus } from '~/packages/common/SelectVariants/FormStatus/constants/FormStatus';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';

export const getFormMutationSchema = (t: TFunction<['common', 'consultant_form']>) => {
  const studentId = {
    required: getRequiredMessageSelectField(t, 'consultant_form:student'),
  };
  const note = {
    length: getRangeLengthMessage(t, 'consultant_form:note', 0, 256),
  };
  const consultantId = {
    required: getRequiredMessageSelectField(t, 'consultant_form:consultantor'),
  };
  const courseRoadMapOrComboId = {
    required: getRequiredMessageSelectField(t, 'consultant_form:course_roadmap_or_combo'),
  };
  const expectDepartmentId = {
    required: getRequiredMessageSelectField(t, 'consultant_form:expect_department'),
  };
  return object({
    studentId: string({ required_error: studentId.required }),
    studentPhone: string().or(literal('')).optional().nullable(),
    studentSchool: string().optional().nullable(),
    studentSource: enum_([
      SourceEnum.Cold,
      SourceEnum.Communication,
      SourceEnum.DataMarketing,
      SourceEnum.HotWarm,
      SourceEnum.HumanResources,
      SourceEnum.Repeat,
    ])
      .optional()
      .nullable(),
    saleEmployees: array(string()).optional(),
    consultantId: string({ required_error: consultantId.required }),
    expectDepartmentId: string({ required_error: expectDepartmentId.required }),
    status: enum_([FormStatus.Consulted, FormStatus.Failed, FormStatus.SalesClosed, FormStatus.UnderCare]).optional(),
    type: enum_([CourseRoadmapOrCombo.COMBO, CourseRoadmapOrCombo.COURSE_ROADMAP]).optional(),
    courseRoadMapOrComboId: string({ required_error: courseRoadMapOrComboId.required }),
    numberSessions: number().optional(),
    sessionDuration: string().optional(),
    originPrice: number().optional(),
    promotionIds: array(string()),
    salePrice: number().optional(),
    gift: string().optional(),
    note: string().trim().min(0, note.length).max(256, note.length).trim().optional().or(literal('')).nullable(),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'consultant_form']>) => {
  return zodResolver(getFormMutationSchema(t));
};
