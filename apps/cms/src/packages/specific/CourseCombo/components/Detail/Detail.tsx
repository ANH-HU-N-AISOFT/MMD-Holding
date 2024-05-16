import { CourseCombo } from '../../models/CourseCombo';
import { FormMutation } from '../FormMutation/FormMutation';

interface Props {
  courseCombo: CourseCombo;
}

export const Detail = ({ courseCombo }: Props) => {
  return (
    <FormMutation
      isSubmiting={false}
      uid=""
      disabled
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
