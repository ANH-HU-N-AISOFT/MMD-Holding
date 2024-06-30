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
        file: documentTemplate.filePath,
        name: documentTemplate.name,
        type: documentTemplate.type,
        status: documentTemplate.status,
      }}
    />
  );
};
