import { TagProps } from 'reactjs';
import { CourseStatus } from '~/packages/specific/Course/models/CourseStatus';

export const CourseComboStatusMappingToColors: Record<CourseStatus, TagProps['color']> = {
  [CourseStatus.ACTIVE]: 'success',
  [CourseStatus.IN_ACTIVE]: 'error',
};
