import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';

export interface CourseRoadmap {
  id: string;
  name: string;
  code: string;
  courseId: string;
  numberSessions: number;
  sessionDuration: number;
  price: number;
  status: CourseStatus;
  notes: string;
  course?: {
    id: string;
    name: string;
    status: CourseStatus;
    notes: string;
  };
}
