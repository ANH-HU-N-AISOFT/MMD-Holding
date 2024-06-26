import { TFunction } from 'i18next';
import { Role } from './Role';

export const getRoleMappingToLabels = (t: TFunction<['enum']>): Record<Role, string> => {
  return {
    [Role.SuperAdmin]: t('enum:role.options.SuperAdmin'),
    [Role.Admin]: t('enum:role.options.Admin'),
    [Role.Consultant]: t('enum:role.options.Consultant'),
    [Role.Lecturer]: t('enum:role.options.Lecturer'),
    [Role.Sale]: t('enum:role.options.Sale'),
    [Role.Student]: t('enum:role.options.Student'),
  };
};
