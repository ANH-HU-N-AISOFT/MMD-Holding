import { TFunction } from 'i18next';
import { Role } from './Role';

export const getRoleMappingToLabels = (t: TFunction<['common', 'enum']>): Record<Role, string> => {
  return {
    [Role.Admin]: t('enum:role.options.Admin'),
    [Role.Consultant]: t('enum:role.options.Consultant'),
    [Role.Lecturer]: t('enum:role.options.Lecturer'),
    [Role.Sale]: t('enum:role.options.Sale'),
    [Role.Student]: t('enum:role.options.Student'),
  };
};
