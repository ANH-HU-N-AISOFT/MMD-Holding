import { CourseRoadmap } from '../../models/CourseRoadmap';
import { FormMutation } from '../FormMutation/FormMutation';

interface Props {
  courseRoadmap: CourseRoadmap;
}

export const Detail = ({ courseRoadmap }: Props) => {
  return (
    <FormMutation
      isSubmiting={false}
      uid=""
      disabled
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
