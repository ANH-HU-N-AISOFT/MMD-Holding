import { ContractTemplate } from '../../models/ContractTemplate';
import { FormMutation } from '../FormMutation/FormMutation';

interface Props {
  contractTemplate: ContractTemplate;
}

export const Detail = ({ contractTemplate }: Props) => {
  return (
    <FormMutation
      isSubmiting={false}
      uid=""
      disabled
      defaultValues={{
        description: contractTemplate.description,
        file: contractTemplate.file,
        name: contractTemplate.name,
      }}
    />
  );
};
