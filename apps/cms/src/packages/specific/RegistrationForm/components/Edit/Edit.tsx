import { RegistrationForm } from '../../models/RegistrationForm';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  registrationForm: RegistrationForm;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ registrationForm, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
      isEdit
      defaultValues={{
        additionalCourseOfAdditionalCourseRegistration1:
          registrationForm.additionalCourseOfAdditionalCourseRegistration1,
        additionalCourseOfAdditionalCourseRegistration2:
          registrationForm.additionalCourseOfAdditionalCourseRegistration2,
        additionalTuitionFeeOfAdditionalCourseRegistration1:
          registrationForm.additionalTuitionFeeOfAdditionalCourseRegistration1,
        additionalTuitionFeeOfAdditionalCourseRegistration2:
          registrationForm.additionalTuitionFeeOfAdditionalCourseRegistration2,
        benefitDeposit: registrationForm.benefitDeposit,
        code: registrationForm.code,
        commitmentCompletionDate: registrationForm.commitmentCompletionDate,
        firstReceiptNumber: registrationForm.firstReceiptNumber,
        firstTuitionFee: registrationForm.firstTuitionFee,
        firstVolumeNumber: registrationForm.firstVolumeNumber,
        newDiscountOfCourseChange: registrationForm.newDiscountOfCourseChange,
        newDiscountOfProgramChange: registrationForm.newDiscountOfProgramChange,
        newTuitionFeeOfCourseChange: registrationForm.newTuitionFeeOfCourseChange,
        newTuitionFeeOfProgramChange: registrationForm.newTuitionFeeOfProgramChange,
        notes: registrationForm.notes,
        paymentMethod: registrationForm.paymentMethod,
        receiptNumber: registrationForm.receiptNumber,
        registrationDateOfAdditionalCourseRegistration1:
          registrationForm.registrationDateOfAdditionalCourseRegistration1,
        registrationDateOfAdditionalCourseRegistration2:
          registrationForm.registrationDateOfAdditionalCourseRegistration2,
        registrationDateOfCourseChange: registrationForm.registrationDateOfCourseChange,
        registrationDateOfProgramChange: registrationForm.registrationDateOfProgramChange,
        secondReceiptNumber: registrationForm.secondReceiptNumber,
        secondTuitionFee: registrationForm.secondTuitionFee,
        secondVolumeNumber: registrationForm.secondVolumeNumber,
        studentCityCode: registrationForm.studentCityCode,
        studentCityId: registrationForm.studentCityId,
        studentCityName: registrationForm.studentCityName,
        studentCurrentAddress: registrationForm.studentCurrentAddress,
        studentDateOfBirth: registrationForm.studentDateOfBirth,
        studentDistrict: registrationForm.studentDistrict,
        studentEmail: registrationForm.studentEmail,
        studentGender: registrationForm.studentGender,
        studentId: registrationForm.studentId,
        studentParentPhone: registrationForm.studentParentPhone,
        studentPhone: registrationForm.studentPhone,
        thirdReceiptNumber: registrationForm.thirdReceiptNumber,
        thirdTuitionFee: registrationForm.thirdTuitionFee,
        thirdVolumeNumber: registrationForm.thirdVolumeNumber,
        totalNumberSessions: registrationForm.totalNumberSessions,
        volumeNumber: registrationForm.volumeNumber,
        courses: registrationForm.courses,
        notifyResultToParent: registrationForm.notifyResultToParent,
        originPrice: registrationForm.originPrice,
        promotion: registrationForm.promotion,
        promotionType: registrationForm.promotionType,
        salePrice: registrationForm.salePrice,
      }}
    />
  );
};
