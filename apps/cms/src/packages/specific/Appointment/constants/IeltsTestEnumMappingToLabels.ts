import { TFunction } from 'i18next';
import { IeltsTestEnum } from '../models/IeltsTestEnum';

export const getIeltsTestEnumMappingToLabels = (t: TFunction<['common', 'enum']>): Record<IeltsTestEnum, string> => {
  return {
    [IeltsTestEnum.FOUNDATION_TEST]: t('enum:ieltsTest.options.foundation_test'),
    [IeltsTestEnum.FULL_IELTS_TEST]: t('enum:ieltsTest.options.full_ielts_test'),
    [IeltsTestEnum.MINI_IELTS_TEST]: t('enum:ieltsTest.options.mini_ielts_test'),
  };
};
