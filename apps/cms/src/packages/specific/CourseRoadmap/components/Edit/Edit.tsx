import { CourseRoadmap } from '../../models/CourseRoadmap';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  courseRoadmap: CourseRoadmap;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ courseRoadmap, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
      defaultValues={{
        description: courseRoadmap.notes,
        name: courseRoadmap.name,
        status: courseRoadmap.status,
        code: courseRoadmap.code,
        courseId: courseRoadmap.course?.id,
        numberSessions: courseRoadmap.numberSessions,
        price: courseRoadmap.price,
        sessionDuration: courseRoadmap.sessionDuration,
      }}
    />
  );
};
