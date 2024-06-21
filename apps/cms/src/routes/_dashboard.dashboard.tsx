import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { FormMutation } from '~/packages/specific/Contract/components/FormMutation/FormMutation';

export const Page = () => {
  return (
    <div>
      <FormMutation isSubmiting={false} uid="" defaultValues={{}} />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
