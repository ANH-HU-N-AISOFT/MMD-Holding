import { TFunction } from 'i18next';
import { GenderEnum } from './GenderEnum';

export const getGenderEnumMappingToLabels = (t: TFunction<['enum']>) => {
  return {
    [GenderEnum.MALE]: t('enum:gender.options.male'),
    [GenderEnum.FEMALE]: t('enum:gender.options.female'),
  };
};
