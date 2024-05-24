import { ConsultantForm } from '../../models/ConsultantForm';
import { CourseRoadmapOrCombo } from '../FormMutation/constants';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

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
        // consultantId: consultantForm.
        // expectDepartmentId:
        // note: consultantForm.
        // studentId: consultantForm.student,
        courseRoadMapOrComboId: consultantForm.courseCombo?.id || consultantForm.courseRoadmap?.id,
        gift: consultantForm.promotions
          ?.map(item => item.giftDiscount)
          .filter(Boolean)
          .join(', '),
        numberSessions: consultantForm.courseCombo
          ? consultantForm.courseCombo?.totalNumberSessions
          : consultantForm.courseRoadmap
            ? consultantForm.courseRoadmap?.numberSessions
            : undefined,
        originPrice: consultantForm.originPrice,
        promotionIds: consultantForm.promotions?.map(item => item.id),
        saleEmployees: consultantForm.saleEmployees?.map(item => item.employeeId),
        salePrice: consultantForm.salePrice,
        sessionDuration: consultantForm.courseCombo
          ? consultantForm.courseCombo.courseRoadmap
              ?.map(item => {
                return [item.code, item.sessionDuration].join(' - ');
              })
              .join(', ')
          : consultantForm.courseRoadmap
            ? consultantForm.courseRoadmap.sessionDuration.toString()
            : undefined,
        status: consultantForm.status,
        studentPhone: consultantForm.student?.phoneNumber,
        studentSchool: consultantForm.student?.school?.id,
        studentSource: consultantForm.student?.source,
        type: consultantForm.courseCombo
          ? CourseRoadmapOrCombo.COMBO
          : consultantForm.courseRoadmap
            ? CourseRoadmapOrCombo.COURSE_ROADMAP
            : undefined,
      }}
    />
  );
};
