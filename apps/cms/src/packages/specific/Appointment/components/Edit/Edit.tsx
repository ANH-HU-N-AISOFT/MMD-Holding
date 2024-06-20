import { uniq } from 'ramda';
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
      isEdit
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
        departmentOfSaleEmployees: uniq(
          (appointment.saleEmployees ?? [])
            .map(employee => employee.organization?.id)
            .filter((item): item is string => !!item),
        ),
        studentId: appointment.student?.id,
        studentPhoneNumber: appointment.student?.phoneNumber,
        studentSaleEmployees: appointment.saleEmployees?.map(employee => employee.employeeId),
        studentSchool: appointment.student?.school?.id,
        studentSource: appointment.student?.source,
        tester: appointment.tester?.id,
        testShiftId: appointment.testingShift?.id,
        testType: appointment.testType,
      }}
    />
  );
};
