import { TFunction } from 'i18next';
import { SystemAccessStatus } from './SystemAccessStatus';

export const getSystemAccessStatusMappingToLabels = (t: TFunction<['enum']>): Record<SystemAccessStatus, string> => {
  return {
    [SystemAccessStatus.BLOCKED]: t('enum:systemAccessStatus.options.BLOCKED'),
    [SystemAccessStatus.GRANTED]: t('enum:systemAccessStatus.options.GRANTED'),
  };
};
