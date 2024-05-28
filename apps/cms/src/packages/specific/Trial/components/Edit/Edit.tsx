import { Trial } from '../../models/Trial';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  trial: Trial;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ trial, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
      defaultValues={{
        adminId: trial.admin?.id,
        classType: trial.classType,
        consultantId: trial.consultant?.id,
        courseRoadmapId: trial.courseRoadmap?.id,
        displaySaleEmployees: trial.saleEmployees?.map(item => item.employeeId),
        displayStudentPhone: trial.student?.phoneNumber,
        displayStudentSchool: trial.student?.school?.id,
        displayStudentSource: trial.student?.source,
        learningDate: trial.learningDate,
        learningOrganizationId: trial.learningOrganization?.id,
        learningTime: trial.learningTime,
        learningType: trial.learningType,
        lectureId: trial.lecture?.id,
        notes: trial.notes,
        status: trial.status,
        studentId: trial.student?.id,
      }}
    />
  );
};
