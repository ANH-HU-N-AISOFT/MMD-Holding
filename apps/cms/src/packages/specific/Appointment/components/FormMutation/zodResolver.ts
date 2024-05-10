import { zodResolver } from '@hookform/resolvers/zod';
import { array, literal, object, string } from 'zod';
import type { TFunction } from 'i18next';
import { getRangeLengthMessage } from '~/utils/functions/getRangeLengthMessage';
import { getRequiredMessageSelectField } from '~/utils/functions/getRequiredMessageSelectField';

export const getFormMutationResolver = (t: TFunction<['common', 'appointment']>) => {
  const studentId = {
    required: getRequiredMessageSelectField(t, 'appointment:student'),
  };
  const expectInspectionDepartmentId = {
    required: getRequiredMessageSelectField(t, 'appointment:expect_inspection_department'),
  };
  const appointmentDate = {
    required: getRequiredMessageSelectField(t, 'appointment:appointment_date'),
  };
  const appointmentTime = {
    required: getRequiredMessageSelectField(t, 'appointment:appointment_time'),
  };
  const ieltsTestType = {
    required: getRequiredMessageSelectField(t, 'appointment:test'),
  };
  const consultant = {
    required: getRequiredMessageSelectField(t, 'appointment:consultant'),
  };
  const demand = {
    required: getRequiredMessageSelectField(t, 'appointment:demand'),
  };
  const testShiftId = {
    required: getRequiredMessageSelectField(t, 'appointment:test_shift'),
  };
  const extraDemand = {
    length: getRangeLengthMessage(t, 'appointment:extra_demand', 1, 32),
  };
  const note = {
    length: getRangeLengthMessage(t, 'appointment:note', 0, 256),
  };
  return zodResolver(
    object({
      studentId: string({ required_error: studentId.required }),

      //
      appointmentStatus: string(),
      expectInspectionDepartmentId: string({ required_error: expectInspectionDepartmentId.required }),
      testType: string(),
      appointmentDate: string({ required_error: appointmentDate.required }),
      appointmentTime: string({ required_error: appointmentTime.required }),
      ieltsTestType: string({ required_error: ieltsTestType.required }),
      demand: array(string(), { required_error: demand.required }).min(1, demand.required),
      extraDemand: string().min(1, extraDemand.length).max(32, extraDemand.length).trim().optional().nullable(),
      testShiftId: string({ required_error: testShiftId.required }),
      //
      consultant: string({ required_error: consultant.required }),
      admin: string().nullable().optional(),
      tester: string().nullable().optional(),

      //
      note: string().trim().min(0, note.length).max(256, note.length).trim().optional().or(literal('')).nullable(),
    }),
  );
};
