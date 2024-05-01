import { TFunction } from 'i18next';
import { JobTitleEnum } from '../models/Employee';

export const getJobTitleMappingToLabels = (t: TFunction<['common', 'employee']>): Record<JobTitleEnum, string> => {
  return {
    [JobTitleEnum.CONSULTANT]: t('employee:jobTitleLabels.CONSULTANT'),
    [JobTitleEnum.LECTURER]: t('employee:jobTitleLabels.LECTURER'),
    [JobTitleEnum.SALES_PERSONNEL]: t('employee:jobTitleLabels.SALES_PERSONNEL'),
  };
};
