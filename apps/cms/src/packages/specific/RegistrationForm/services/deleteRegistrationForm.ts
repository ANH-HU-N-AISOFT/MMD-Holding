import { delay } from 'utilities';
import { RegistrationForm } from '../models/RegistrationForm';
import { registrationForms, remove } from './data';

export interface DeleteRegistrationForm {
  id: RegistrationForm['id'];
}

export const deleteRegistrationForm = async ({ id }: DeleteRegistrationForm) => {
  await delay(500);

  const index = registrationForms.findIndex(template => template.id === id);

  if (index === -1) {
    return { success: false, message: 'Registration form not found' };
  }

  remove(index);

  return { success: true, message: 'Registration form deleted successfully' };
};
