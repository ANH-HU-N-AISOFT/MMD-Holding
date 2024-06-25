import { TFunction } from 'i18next';
import { SourceEnum } from '../models/SourceEnum';

export const getSourceEnumMappingToLabels = (t: TFunction<['student']>): Record<SourceEnum, string> => {
  return {
    [SourceEnum.Cold]: t('student:Cold'),
    [SourceEnum.Communication]: t('student:Communication'),
    [SourceEnum.HotWarm]: t('student:HotWarm'),
    [SourceEnum.HumanResources]: t('student:HumanResources'),
    [SourceEnum.DataMarketing]: t('student:DataMarketing'),
    [SourceEnum.Repeat]: t('student:Repeat'),
  };
};
