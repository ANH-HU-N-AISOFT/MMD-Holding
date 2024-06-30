import { DocumentTemplate } from '../../models/DocumentTemplate';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  documentTemplate: DocumentTemplate;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ documentTemplate, ...formProps }: Props) => {
  return (
    <FormMutation
      {...formProps}
      defaultValues={{
        description: documentTemplate.description,
        file: documentTemplate.filePath,
        name: documentTemplate.name,
        type: documentTemplate.type,
        status: documentTemplate.status,
      }}
    />
  );
};
