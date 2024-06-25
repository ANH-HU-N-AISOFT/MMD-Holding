import { TFunction } from 'i18next';
import { FormStatus } from '../models/FormStatus';

export const getFormStatusMappingToLabels = (t: TFunction<['common', 'enum']>): Record<FormStatus, string> => {
  return {
    [FormStatus.Consulted]: t('enum:formStatus.options.Consulted'),
    [FormStatus.Failed]: t('enum:formStatus.options.Failed'),
    [FormStatus.Trial]: t('enum:formStatus.options.Trial'),
    [FormStatus.SalesClosed]: t('enum:formStatus.options.SalesClosed'),
    [FormStatus.UnderCare]: t('enum:formStatus.options.UnderCare'),
  };
};
