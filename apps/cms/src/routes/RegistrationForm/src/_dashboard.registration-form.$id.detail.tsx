import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeleteRegistrationFormResponse,
  action as actionDeleteRegistrationForm,
} from './_dashboard.registration-form.$id.delete';
import { isCanDeleteRegistrationForm, isCanEditRegistrationForm, isCanReadRegistrationForm } from './utils/Is';
import { Footer } from '~/components/Detail/Footer';
import { Header } from '~/components/Detail/Header';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import {
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
  useFetcher,
  useLoaderData,
  useNavigate,
} from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { Detail } from '~/packages/specific/RegistrationForm/components/Detail/Detail';
import { RegistrationForm } from '~/packages/specific/RegistrationForm/models/RegistrationForm';
import { getRegistrationForm } from '~/packages/specific/RegistrationForm/services/getRegistrationForm';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnDetailPage } from '~/utils/functions/preventRevalidateOnDetailPage';

type LoaderResponse = SimpleResponse<{ registrationForm: RegistrationForm }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanReadRegistrationForm);
  if (!params['id']) {
    return redirect('/registration-form', {});
  }
  try {
    const response = await getRegistrationForm({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        registrationForm: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['registration_form', 'page404']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteRegistrationFormFetcher = useFetcher<typeof actionDeleteRegistrationForm>();

  const isDeleting = useMemo(() => {
    return deleteRegistrationFormFetcher.state === 'loading' || deleteRegistrationFormFetcher.state === 'submitting';
  }, [deleteRegistrationFormFetcher]);
  const [isOpenModalDeleteRegistrationForm, setIsOpenModalDeleteRegistrationForm] = useState<string | false>(false);

  const handleDelete = () => {
    deleteRegistrationFormFetcher.submit(
      {},
      { method: 'DELETE', action: `/registration-form/${isOpenModalDeleteRegistrationForm}/delete` },
    );
  };

  useEffect(() => {
    if (deleteRegistrationFormFetcher.data && deleteRegistrationFormFetcher.state === 'idle') {
      const response = deleteRegistrationFormFetcher.data as ActionDeleteRegistrationFormResponse;
      if (response.hasError) {
        notification.error({
          message: t('registration_form:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('registration_form:delete_success') });
        navigate('/registration-form');
        setIsOpenModalDeleteRegistrationForm(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteRegistrationFormFetcher.state]);
  //#endregion

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('registration_form:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/registration-form')}>
            {t('registration_form:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('registration_form:registration_form_with_name', {
            name: loaderData.info?.registrationForm.studentName,
          })}
          onBack={() => navigate('/registration-form')}
        />
        <div className="flex-1 mb-4">
          <Detail registrationForm={loaderData.info?.registrationForm} />
        </div>
        <Footer
          onDelete={() => setIsOpenModalDeleteRegistrationForm(loaderData.info?.registrationForm.id ?? false)}
          onEdit={() => navigate(`/registration-form/${loaderData.info?.registrationForm.id}/edit`)}
          deletable={isCanShow(isCanDeleteRegistrationForm)}
          editable={isCanShow(isCanEditRegistrationForm)}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteRegistrationForm}
        onCancel={() => setIsOpenModalDeleteRegistrationForm(false)}
        onOk={handleDelete}
        title={t('registration_form:delete_title')}
        description={t('registration_form:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnDetailPage;

export default Page;
