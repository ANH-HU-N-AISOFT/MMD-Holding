import { CourseStatus } from '~/packages/specific/Course/models/CourseStatus';

export interface CourseCombo {
  id: string;
  name: string;
  courseRoadmapIds: string[];
  status: CourseStatus;
  notes: string;
  courseRoadmap?: Array<{
    id: string;
    name: string;
    status: CourseStatus;
    code: string;
    numberSessions: number;
    sessionDuration: number;
    price: number;
    notes: string;
  }>;
  totalNumberSessions: number;
  totalPrice: number;
}
