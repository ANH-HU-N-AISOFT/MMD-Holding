import { HomeOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Result, notification } from 'reactjs';
import {
  ActionResponse as ActionDeleteConsultantFormResponse,
  action as actionDeleteConsultantForm,
} from './_dashboard.consultant-form.$id.delete';
import { isCanDeleteConsultantForm, isCanEditConsultantForm, isCanReadConsultantForm } from './utils/Is';
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
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { Detail } from '~/packages/specific/ConsultantForm/components/Detail/Detail';
import { ConsultantForm } from '~/packages/specific/ConsultantForm/models/ConsultantForm';
import { getConsultantForm } from '~/packages/specific/ConsultantForm/services/getConsultantForm';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { isCanShow } from '~/packages/specific/Permission/isCan/isCanShow';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnDetailPage } from '~/utils/functions/preventRevalidateOnDetailPage';

type LoaderResponse = SimpleResponse<{ consultantForm: ConsultantForm }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanReadConsultantForm);
  if (!params['id']) {
    return redirect('/consultant-form', {});
  }
  try {
    const response = await getConsultantForm({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        consultantForm: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['consultant_form', 'page404']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteConsultantFormFetcher = useFetcher<typeof actionDeleteConsultantForm>();

  const isDeleting = useMemo(() => {
    return deleteConsultantFormFetcher.state === 'loading' || deleteConsultantFormFetcher.state === 'submitting';
  }, [deleteConsultantFormFetcher]);
  const [isOpenModalDeleteConsultantForm, setIsOpenModalDeleteConsultantForm] = useState<string | false>(false);

  const handleDelete = () => {
    deleteConsultantFormFetcher.submit(
      {},
      { method: 'DELETE', action: `/consultant-form/${isOpenModalDeleteConsultantForm}/delete` },
    );
  };

  useEffect(() => {
    if (deleteConsultantFormFetcher.data && deleteConsultantFormFetcher.state === 'idle') {
      const response = deleteConsultantFormFetcher.data as ActionDeleteConsultantFormResponse;
      if (response.hasError) {
        notification.error({
          message: t('consultant_form:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('consultant_form:delete_success') });
        navigate('/consultant-form');
        setIsOpenModalDeleteConsultantForm(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteConsultantFormFetcher.state]);
  //#endregion

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('consultant_form:not_found')}
        extra={
          <Button icon={<HomeOutlined />} color="primary" onClick={() => navigate('/consultant-form')}>
            {t('consultant_form:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          title={t('consultant_form:consultant_form_with_name', {
            name: loaderData.info?.consultantForm.student?.fullName,
          })}
          onBack={() => navigate('/consultant-form')}
        />
        <div className="mb-4 flex-1">
          <Detail consultantForm={loaderData.info?.consultantForm} />
        </div>
        <Footer
          onDelete={() => setIsOpenModalDeleteConsultantForm(loaderData.info?.consultantForm.id ?? false)}
          onEdit={() => navigate(`/consultant-form/${loaderData.info?.consultantForm.id}/edit`)}
          deletable={isCanShow(isCanDeleteConsultantForm)}
          editable={isCanShow(isCanEditConsultantForm)}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteConsultantForm}
        onCancel={() => setIsOpenModalDeleteConsultantForm(false)}
        onOk={handleDelete}
        title={t('consultant_form:delete_title')}
        description={t('consultant_form:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnDetailPage;

export default Page;
