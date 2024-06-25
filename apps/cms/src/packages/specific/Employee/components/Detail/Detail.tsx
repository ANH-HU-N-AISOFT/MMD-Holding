import { Employee } from '../../models/Employee';
import { FormMutation } from '../FormMutation/FormMutation';

interface Props {
  employee: Employee;
}

export const Detail = ({ employee }: Props) => {
  return (
    <FormMutation
      hidePasswordField
      isSubmiting={false}
      uid=""
      disabled
      employee={employee}
      defaultValues={{
        personalInformation: {
          citizenIdCard: employee.cmnd,
          currentAddress: employee.currentAddress,
          dateOfBirth: employee.birthday,
          emergencyContactName: employee.emergencyContactName,
          emergencyContactPhone: employee.emergencyContactPhone,
          emergencyContactRelationship: employee.emergencyContactRelationship,
          fullName: employee.fullName,
          gender: employee.gender,
          notes: employee.notes,
          personalEmail: employee.personalEmail,
          phone: employee.phoneNumber,
          country: employee.nationality,
          residenceAddress: employee.permanentAddress,
          workEmail: employee.workEmail,
        },
        personnelRecord: {
          code: employee.employee?.code,
          contractEndEffectDate: employee.employee?.contractEndDate,
          contractStartEffectDate: employee.employee?.contractStartDate,
          contractType: employee.employee?.contractType,
          department: employee.employee?.organizationId,
          directionManager: employee.directManager?.id,
          jobTitles: employee.employee?.jobTitles,
          workStatus: employee.employee?.workStatus,
        },
        roleSystem: {
          accessStatus: employee.user?.accessStatus,
          roles: employee.user?.roles,
          username: employee.user?.userName,
        },
      }}
    />
  );
};
