import { TFunction } from 'i18next';
import { FormStatus } from '../models/FormStatus';

export const getFormStatusMappingToLabels = (t: TFunction<['consultant_form']>): Record<FormStatus, string> => {
  return {
    [FormStatus.Consulted]: t('consultant_form:Consulted'),
    [FormStatus.Failed]: t('consultant_form:Failed'),
    [FormStatus.Trial]: t('consultant_form:Trial'),
    [FormStatus.SalesClosed]: t('consultant_form:SalesClosed'),
    [FormStatus.UnderCare]: t('consultant_form:UnderCare'),
  };
};
