import { Appointment } from '../../models/Appointment';
import { FormMutation } from '../FormMutation/FormMutation';

interface Props {
  appointment: Appointment;
}

export const Detail = ({ appointment }: Props) => {
  return (
    <FormMutation
      isSubmiting={false}
      uid=""
      disabled
      defaultValues={{
        admin: appointment.admin?.id,
        appointmentDate: appointment.appointmentDate,
        appointmentStatus: appointment.status,
        appointmentTime: appointment.appointmentTime,
        consultant: appointment.consultant?.id,
        demand: appointment.demands,
        expectInspectionDepartmentId: appointment.organization?.id,
        extraDemand: appointment.extraDemand,
        ieltsTestType: appointment.test,
        note: appointment.notes,
        // FIXME: BE update sau
        studentDepartment: [],
        studentId: appointment.student?.id,
        studentPhoneNumber: appointment.student?.phoneNumber,
        // FIXME: BE update sau
        studentSaleEmployees: [],
        studentSchool: appointment.student?.school?.id,
        studentSource: undefined,
        tester: appointment.tester?.id,
        testShiftId: appointment.testingShift?.id,
        testType: appointment.testType,
      }}
    />
  );
};
