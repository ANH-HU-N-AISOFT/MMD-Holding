import { TFunction } from 'i18next';
import { DemoType } from '../models/DemoType';

export const getDemoTypeMappingToLabels = (t: TFunction<['trial_request']>): Record<DemoType, string> => {
  return {
    [DemoType.AvailableClass]: t('trial_request:AvailableClass'),
    [DemoType.PrivateClass]: t('trial_request:PrivateClass'),
  };
};
