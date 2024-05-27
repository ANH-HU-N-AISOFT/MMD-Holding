import { CourseRoadmap } from '../../CourseRoadmap/models/CourseRoadmap';

interface GetDisplaySessionDuration {
  courseRoadmaps?: Array<{
    sessionDuration: CourseRoadmap['sessionDuration'];
    code: CourseRoadmap['code'];
  }>;
}

export const getDisplaySessionDuration = ({ courseRoadmaps }: GetDisplaySessionDuration) => {
  if (!courseRoadmaps) {
    return undefined;
  }
  return courseRoadmaps
    ?.map(item => {
      return [item.code, item.sessionDuration].join(' - ');
    })
    .join(', ');
};
