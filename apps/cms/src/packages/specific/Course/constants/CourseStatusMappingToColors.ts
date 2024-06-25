import { TagProps } from 'reactjs';
import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';

export const CourseStatusMappingToColors: Record<CourseStatus, TagProps['color']> = {
  [CourseStatus.ACTIVE]: 'success',
  [CourseStatus.IN_ACTIVE]: 'error',
};
