import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from 'reactjs';
import { isCanCreateDocumentTemplate } from './utils/Is';
import { Footer } from '~/components/Mutation/Footer';
import { Header } from '~/components/Mutation/Header';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import {
  ActionFunctionArgs,
  TypedResponse,
  json,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from '~/overrides/remix';
import { getValidatedFormData } from '~/overrides/remix-hook-form';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { FormMutation, FormValues } from '~/packages/specific/DocumentTemplate/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/DocumentTemplate/components/FormMutation/zodResolver';
import { DocumentTemplateType } from '~/packages/specific/DocumentTemplate/models/DocumentTemplateType';
import { createDocumentTemplate } from '~/packages/specific/DocumentTemplate/services/createDocumentTemplate';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { objectToFormData } from '~/utils/functions/formData/objectToFormData';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnCreatePage } from '~/utils/functions/preventRevalidateOnCreatePage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanCreateDocumentTemplate);
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request.clone(),
      getFormMutationResolver(t as TFunction<any>),
    );

    if (data) {
      await createDocumentTemplate({
        name: data.name,
        description: data.description,
        file: typeof data.file === 'string' ? undefined : data.file,
        type: data.type,
      });
      return json({
        hasError: false,
        message: 'Created',
        info: undefined,
      });
    }

    return json(...handleFormResolverError<FormValues>(errors));
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

const FormCreateUid = 'FORM_CREATE';

export const loader = async () => {
  await isCanAccessRoute(isCanCreateDocumentTemplate);
  return json({});
};

export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['document_template']);

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('document_template:create_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('document_template:create_success') });
        navigate('/document-template');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);
  return (
    <div className="flex h-full flex-col">
      <Header title={t('document_template:add_document_template')} onBack={() => navigate('/document-template')} />
      <div className="mb-4 flex-1">
        <FormMutation
          isSubmiting={isSubmiting}
          uid={FormCreateUid}
          defaultValues={{
            type: DocumentTemplateType.CONTRACT,
          }}
          onSubmit={values => {
            submit(objectToFormData(values), {
              encType: 'multipart/form-data',
              method: 'POST',
            });
          }}
        />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onCancel={() => navigate('/document-template')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnCreatePage;

export default Page;
