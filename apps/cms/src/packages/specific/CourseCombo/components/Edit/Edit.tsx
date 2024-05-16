import { CourseCombo } from '../../models/CourseCombo';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  courseCombo: CourseCombo;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ courseCombo, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
      defaultValues={{
        description: courseCombo.notes,
        name: courseCombo.name,
        courseRoadmapIds: courseCombo.courseRoadmapIds,
        status: courseCombo.status,
        totalNumberSessions: courseCombo.totalNumberSessions,
        totalPrice: courseCombo.totalPrice,
        displayTotalSessionDuration: courseCombo.courseRoadmap
          ?.map(courseRoadmap => {
            return [courseRoadmap.code, courseRoadmap.sessionDuration].join(' - ');
          })
          .join(', '),
      }}
    />
  );
};
