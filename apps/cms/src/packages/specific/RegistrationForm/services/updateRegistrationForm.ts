import { RegistrationForm } from '../models/RegistrationForm';
import { update } from './data';

export interface UpdateRegistrationForm {
  id: RegistrationForm['id'];
  data: Omit<RegistrationForm, 'id' | 'createdAt'>;
}

export interface ResponseSuccess {}

export const updateRegistrationForm = async ({ data, id }: UpdateRegistrationForm) => {
  return update(id, data);
};
