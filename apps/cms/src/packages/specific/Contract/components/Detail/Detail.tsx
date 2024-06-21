import { Contract } from '../../models/Contract';
import { FormMutation } from '../FormMutation/FormMutation';

interface Props {
  contract: Contract;
}

export const Detail = ({ contract }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <FormMutation
          isSubmiting={false}
          uid=""
          disabled
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
      </div>
    </div>
  );
};
