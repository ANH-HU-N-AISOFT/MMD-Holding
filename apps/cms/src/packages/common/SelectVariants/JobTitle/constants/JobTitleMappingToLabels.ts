import { TFunction } from 'i18next';
import { JobTitleEnum } from './JobTitleEnum';

export const getJobTitleMappingToLabels = (t: TFunction<['common', 'enum']>): Record<JobTitleEnum, string> => {
  return {
    [JobTitleEnum.CONSULTANT]: t('enum:jobTitle.options.CONSULTANT'),
    [JobTitleEnum.LECTURER]: t('enum:jobTitle.options.LECTURER'),
    [JobTitleEnum.SALES_PERSONNEL]: t('enum:jobTitle.options.SALES_PERSONNEL'),
  };
};