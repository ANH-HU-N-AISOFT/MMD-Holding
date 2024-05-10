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
        departmentOfSaleEmployees: appointment.saleEmployees
          ?.map(employee => employee.organization?.id)
          .filter((item): item is string => !!item),
        studentId: appointment.student?.id,
        studentPhoneNumber: appointment.student?.phoneNumber,
        studentSaleEmployees: appointment.saleEmployees?.map(employee => employee.employeeId),
        studentSchool: appointment.student?.school,
        studentSource: undefined,
        tester: appointment.tester?.id,
        testShiftId: appointment.testingShift?.id,
        testType: appointment.testType,
      }}
    />
  );
};
