import { ContractTemplate } from '../../models/ContractTemplate';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  contractTemplate: ContractTemplate;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ contractTemplate, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
      defaultValues={{
        description: contractTemplate.description,
        file: contractTemplate.file,
        name: contractTemplate.name,
      }}
    />
  );
};
