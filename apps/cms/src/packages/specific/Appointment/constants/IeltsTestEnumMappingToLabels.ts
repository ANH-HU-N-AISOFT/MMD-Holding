import { TFunction } from 'i18next';
import { IeltsTestEnum } from '../models/IeltsTestEnum';

export const getIeltsTestEnumMappingToLabels = (t: TFunction<['appointment']>): Record<IeltsTestEnum, string> => {
  return {
    [IeltsTestEnum.FOUNDATION_TEST]: t('appointment:foundation_test'),
    [IeltsTestEnum.FULL_IELTS_TEST]: t('appointment:full_ielts_test'),
    [IeltsTestEnum.MINI_IELTS_TEST]: t('appointment:mini_ielts_test'),
  };
};
