import { CourseStatus } from '~/packages/specific/Course/models/CourseStatus';

export interface Course {
  id: string;
  name: string;
  status: CourseStatus;
  notes: string;
  courseRoadmaps?: Array<{
    id: string;
    name: string;
    code: string;
    courseId: string;
    numberSessions: number;
    sessionDuration: number;
    price: number;
    status: string;
    notes: string;
  }>;
}
