import { TagProps } from 'antd';
import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';

export const CourseComboStatusMappingToColors: Record<CourseStatus, TagProps['color']> = {
  [CourseStatus.ACTIVE]: 'success',
  [CourseStatus.IN_ACTIVE]: 'error',
};
