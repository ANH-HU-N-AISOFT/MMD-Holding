import { FormValues } from '../components/FormMutation/FormMutation';
import { RegistrationForm } from '../models/RegistrationForm';
import { add, registrationForms } from './data';

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
  };

  add(newDocumentTemplate);

  return newDocumentTemplate;
};
