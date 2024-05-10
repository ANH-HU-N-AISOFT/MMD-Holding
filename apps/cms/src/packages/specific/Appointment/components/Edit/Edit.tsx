import { Appointment } from '../../models/Appointment';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  appointment: Appointment;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ appointment, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
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
