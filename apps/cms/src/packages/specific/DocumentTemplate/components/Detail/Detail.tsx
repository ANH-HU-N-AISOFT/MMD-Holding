import { DocumentTemplate } from '../../models/DocumentTemplate';
import { FormMutation } from '../FormMutation/FormMutation';

interface Props {
  documentTemplate: DocumentTemplate;
}

export const Detail = ({ documentTemplate }: Props) => {
  return (
    <FormMutation
      isSubmiting={false}
      uid=""
      disabled
      defaultValues={{
        description: documentTemplate.description,
        file: documentTemplate.file,
        name: documentTemplate.name,
        status: documentTemplate.status,
        type: documentTemplate.type,
      }}
    />
  );
};
