import { TFunction } from 'i18next';
import { Role } from '../models/Employee';

export const getRoleMappingToLabels = (t: TFunction<['common', 'employee']>): Record<Role, string> => {
  return {
    [Role.Admin]: t('employee:roleLabels.Admin'),
    [Role.Consultant]: t('employee:roleLabels.Consultant'),
    [Role.Lecturer]: t('employee:roleLabels.Lecturer'),
    [Role.Sale]: t('employee:roleLabels.Sale'),
    [Role.Student]: t('employee:roleLabels.Student'),
  };
};
