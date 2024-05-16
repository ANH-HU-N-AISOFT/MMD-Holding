import { Course } from '../../models/Course';
import { FormMutation } from '../FormMutation/FormMutation';

interface Props {
  course: Course;
}

export const Detail = ({ course }: Props) => {
  return (
    <FormMutation
      isSubmiting={false}
      uid=""
      disabled
      defaultValues={{
        description: course.notes,
        name: course.name,
        status: course.status,
      }}
    />
  );
};
