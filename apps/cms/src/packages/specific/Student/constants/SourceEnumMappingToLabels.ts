import { TFunction } from 'i18next';
import { SourceEnum } from '../models/SourceEnum';

export const getSourceEnumMappingToLabels = (t: TFunction<['enum']>): Record<SourceEnum, string> => {
  return {
    [SourceEnum.Cold]: t('enum:source.options.Cold'),
    [SourceEnum.Communication]: t('enum:source.options.Communication'),
    [SourceEnum.HotWarm]: t('enum:source.options.HotWarm'),
    [SourceEnum.HumanResources]: t('enum:source.options.HumanResources'),
    [SourceEnum.DataMarketing]: t('enum:source.options.DataMarketing'),
    [SourceEnum.Repeat]: t('enum:source.options.Repeat'),
  };
};
