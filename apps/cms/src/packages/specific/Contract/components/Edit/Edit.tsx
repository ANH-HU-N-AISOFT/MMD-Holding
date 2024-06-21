import { Contract } from '../../models/Contract';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  contract: Contract;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ contract, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
      isEdit
      defaultValues={{
        code: contract.code,
        organizationName: contract.organizationName,
        parentCitizenIdCard: contract.parentCitizenIdCard,
        parentCitizenIdCardCreatedAt: contract.parentCitizenIdCardCreatedAt,
        parentCitizenIdCardCreatedWhere: contract.parentCitizenIdCardCreatedWhere,
        parentCurrentAddress: contract.parentCurrentAddress,
        parentDateOfBirth: contract.parentDateOfBirth,
        parentGender: contract.parentGender,
        parentName: contract.parentName,
        parentPhone: contract.parentPhone,
        studentCitizenIdCard: contract.studentCitizenIdCard,
        studentCitizenIdCardCreatedAt: contract.studentCitizenIdCardCreatedAt,
        studentCitizenIdCardCreatedWhere: contract.studentCitizenIdCardCreatedWhere,
        studentCurrentAddress: contract.studentCurrentAddress,
        studentDateOfBirth: contract.studentDateOfBirth,
        studentGender: contract.studentGender,
        studentId: contract.studentId,
        studentName: contract.studentName,
        studentPhone: contract.studentPhone,
      }}
    />
  );
};
