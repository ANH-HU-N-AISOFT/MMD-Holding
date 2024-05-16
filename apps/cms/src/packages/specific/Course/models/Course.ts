import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';

export interface Course {
  id: string;
  name: string;
  status: CourseStatus;
  notes: string;
}
