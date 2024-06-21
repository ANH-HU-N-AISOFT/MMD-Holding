import { FormValues } from '../components/FormMutation/FormMutation';

export type Contract = FormValues & {
  id: string;
  createdAt: string;
};
