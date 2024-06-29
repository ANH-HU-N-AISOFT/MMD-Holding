import { HomeOutlined } from '@ant-design/icons';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Result, notification } from 'reactjs';
import { isCanEditDocumentTemplate } from './utils/Is';
import { Footer } from '~/components/Mutation/Footer';
import { Header } from '~/components/Mutation/Header';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from '~/overrides/remix';
import { getValidatedFormData } from '~/overrides/remix-hook-form';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { Edit } from '~/packages/specific/DocumentTemplate/components/Edit/Edit';
import { FormValues } from '~/packages/specific/DocumentTemplate/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/DocumentTemplate/components/FormMutation/zodResolver';
import { DocumentTemplate } from '~/packages/specific/DocumentTemplate/models/DocumentTemplate';
import { getDocumentTemplate } from '~/packages/specific/DocumentTemplate/services/getDocumentTemplate';
import { updateDocumentTemplate } from '~/packages/specific/DocumentTemplate/services/updateDocumentTemplate';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { objectToFormData } from '~/utils/functions/formData/objectToFormData';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request, params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanEditDocumentTemplate);
  if (!params['id']) {
    return redirect('/document-template', {});
  }
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request.clone(),
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await updateDocumentTemplate({
        id: params['id'],
        data: {
          id: params['id'],
          name: data.name,
          description: data.description,
          file: typeof data.file === 'string' ? undefined : data.file,
          type: data.type,
        },
      });
      return json({
        hasError: false,
        message: 'Updated',
        info: undefined,
      });
    }
    return json(...handleFormResolverError<FormValues>(errors));
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

type LoaderResponse = SimpleResponse<{ documentTemplate: DocumentTemplate }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanEditDocumentTemplate);
  if (!params['id']) {
    return redirect('/document-template', {});
  }
  try {
    const response = await getDocumentTemplate({ id: params['id'] });
    return json({
      info: {
        documentTemplate: response,
      },
      hasError: false,
      message: '',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

const FormUpdate = 'FORM_UPDATE';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['document_template']);

  const loaderData = useLoaderData<typeof loader>();

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
          message: t('document_template:update_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('document_template:update_success') });
        navigate('/document-template');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('document_template:not_found')}
        extra={
          <Button icon={<HomeOutlined />} color="primary" onClick={() => navigate('/document-template')}>
            {t('document_template:back_to_list')}
          </Button>
        }
      />
    );
  }
  return (
    <div className="flex h-full flex-col">
      <Header
        title={t('document_template:document_template_with_name', { name: loaderData.info?.documentTemplate.name })}
        onBack={() => navigate('/document-template')}
      />
      <div className="mb-4 flex-1">
        <Edit
          isSubmiting={isSubmiting}
          uid={FormUpdate}
          documentTemplate={loaderData.info.documentTemplate}
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
        okConfirmProps={{ form: FormUpdate, htmlType: 'submit' }}
        onCancel={() => navigate('/document-template')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnEditPage;

export default Page;
