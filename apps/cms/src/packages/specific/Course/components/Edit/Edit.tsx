import { Course } from '../../models/Course';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  course: Course;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ course, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
      defaultValues={{
        description: course.notes,
        name: course.name,
        status: course.status,
      }}
    />
  );
};
