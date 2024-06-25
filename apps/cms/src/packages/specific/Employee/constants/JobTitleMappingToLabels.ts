import { TFunction } from 'i18next';
import { JobTitleEnum } from '../models/JobTitleEnum';

export const getJobTitleMappingToLabels = (t: TFunction<['employee']>): Record<JobTitleEnum, string> => {
  return {
    [JobTitleEnum.CONSULTANT]: t('employee:CONSULTANT'),
    [JobTitleEnum.LECTURER]: t('employee:LECTURER'),
    [JobTitleEnum.SALES_PERSONNEL]: t('employee:SALES_PERSONNEL'),
  };
};
