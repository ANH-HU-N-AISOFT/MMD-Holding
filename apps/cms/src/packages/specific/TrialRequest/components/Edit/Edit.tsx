import { TrialRequest } from '../../models/TrialRequest';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  trialRequest: TrialRequest;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ trialRequest, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
      isEdit
      trialRequest={trialRequest}
      defaultValues={{
        adminId: trialRequest.admin?.id,
        classType: trialRequest.demoType,
        consultantId: trialRequest.consultant?.id,
        courseRoadmapId: trialRequest.courseRoadmap?.id,
        displaySaleEmployees: trialRequest.saleEmployees?.map(item => item.employeeId),
        displayStudentPhone: trialRequest.student?.phoneNumber,
        displayStudentSchool: trialRequest.student?.school?.id,
        displayStudentSource: trialRequest.student?.source,
        learningDate: trialRequest.studyDate,
        learningOrganizationId: trialRequest.learningOrganization?.id,
        learningTime: trialRequest.studyTime,
        studyMode: trialRequest.studyMode,
        lectureId: trialRequest.lecturer?.id,
        notes: trialRequest.notes,
        status: trialRequest.status,
        studentId: trialRequest.student?.id,
      }}
    />
  );
};
