import { RegistrationForm } from '../models/RegistrationForm';
import { registrationForms } from './data';

export type ResponseSuccess = RegistrationForm;

interface GetRegistrationForm {
  id: RegistrationForm['id'];
}

export const getRegistrationForm = async ({ id }: GetRegistrationForm) => {
  const documentTemplate = registrationForms.find(item => item.id === id);

  if (!documentTemplate) {
    throw new Error('Registration form not exist');
  }

  return documentTemplate;
};
