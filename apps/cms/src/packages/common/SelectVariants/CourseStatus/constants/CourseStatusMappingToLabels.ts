import { TFunction } from 'i18next';
import { CourseStatus } from './CourseStatus';

export const getCourseStatusMappingToLabels = (t: TFunction<['common', 'enum']>): Record<CourseStatus, string> => {
  return {
    [CourseStatus.ACTIVE]: t('enum:courseStatus.options.ACTIVE'),
    [CourseStatus.IN_ACTIVE]: t('enum:courseStatus.options.IN_ACTIVE'),
  };
};
