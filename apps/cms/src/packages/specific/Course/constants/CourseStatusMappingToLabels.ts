import { TFunction } from 'i18next';
import { CourseStatus } from '../models/CourseStatus';

export const getCourseStatusMappingToLabels = (t: TFunction<['course']>): Record<CourseStatus, string> => {
  return {
    [CourseStatus.ACTIVE]: t('course:ACTIVE'),
    [CourseStatus.IN_ACTIVE]: t('course:IN_ACTIVE'),
  };
};
