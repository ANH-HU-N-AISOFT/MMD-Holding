import { TFunction } from 'i18next';
import { SourceEnum } from './SourceEnum';

export const getSourceEnumMappingToLabels = (t: TFunction<['common', 'enum']>): Record<SourceEnum, string> => {
  return {
    [SourceEnum.Cold]: t('enum:source.options.Cold'),
    [SourceEnum.Communication]: t('enum:source.options.Communication'),
    [SourceEnum.HotWarm]: t('enum:source.options.HotWarm'),
    [SourceEnum.HumanResources]: t('enum:source.options.HumanResources'),
  };
};
