import { ConsultantForm } from '../../models/ConsultantForm';
import { CourseRoadmapOrCombo } from '../FormMutation/constants';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';
import { getDisplaySessionDuration } from '~/packages/specific/CourseCombo/utils/getDisplaySessionDuration';

interface Props {
  consultantForm: ConsultantForm;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ consultantForm, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
      defaultValues={{
        consultantId: consultantForm.consultant?.id,
        expectDepartmentId: consultantForm.learningOrganization?.id,
        note: consultantForm.notes,
        studentId: consultantForm.student?.id,
        courseRoadMapOrComboId: consultantForm.courseCombo?.id || consultantForm.courseRoadmap?.id,
        calculateQuantityCourseRoadMap:
          consultantForm.courseCombo?.courseRoadmap?.length ?? consultantForm.courseRoadmap ? 1 : undefined,
        displayNumberSessions: consultantForm.courseCombo
          ? consultantForm.courseCombo?.totalNumberSessions
          : consultantForm.courseRoadmap
            ? consultantForm.courseRoadmap?.numberSessions
            : undefined,
        calculateNDisplayOriginPrice: consultantForm.originPrice,
        promotionIds: consultantForm.promotions?.map(item => item.id),
        displaySaleEmployees: consultantForm.saleEmployees?.map(item => item.employeeId),
        displaySalePrice: consultantForm.salePrice,
        displaySessionDuration: consultantForm.courseCombo
          ? getDisplaySessionDuration({ courseRoadmaps: consultantForm.courseCombo.courseRoadmap })
          : consultantForm.courseRoadmap
            ? consultantForm.courseRoadmap.sessionDuration.toString()
            : undefined,
        status: consultantForm.status,
        displayStudentPhone: consultantForm.student?.phoneNumber,
        displayStudentSchool: consultantForm.student?.school?.id,
        displayStudentSource: consultantForm.student?.source,
        directionalType: consultantForm.courseCombo
          ? CourseRoadmapOrCombo.COMBO
          : consultantForm.courseRoadmap
            ? CourseRoadmapOrCombo.COURSE_ROADMAP
            : undefined,
        calculatePromotions: consultantForm.promotions?.map(item => ({
          programType: item.programType,
          feeDiscount: item.feeDiscount,
          percentageDiscount: item.percentageDiscount,
        })),
        gifts: consultantForm.gifts?.map(item => item.id),
        displayGiftPrice: consultantForm.giftInCurrency,
        examResults: consultantForm.examResults,
      }}
    />
  );
};
