import { FormValues } from '../components/FormMutation/FormMutation';
import { RegistrationForm } from '../models/RegistrationForm';
import { add, registrationForms } from './data';
import { getSession } from '~/packages/common/Auth/sessionStorage';

export interface CreateRegistrationForm {
  data: FormValues;
}

export type ResponseSuccess = RegistrationForm;

export const createRegistrationForm = async ({ data }: CreateRegistrationForm) => {
  const maxId = registrationForms.reduce((max, template) => Math.max(max, parseInt(template.id)), 0);

  const newDocumentTemplate: RegistrationForm = {
    ...data,
    id: (maxId + 1).toString(),
    createdAt: new Date().toISOString(),
    organization: getSession()?.profile?.organizationName,
  };

  add(newDocumentTemplate);

  return newDocumentTemplate;
};
