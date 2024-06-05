import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeleteConsultantFormResponse,
  action as actionDeleteConsultantForm,
} from './_dashboard.consultant-form.$id.delete';
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
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { Detail } from '~/packages/specific/ConsultantForm/components/Detail/Detail';
import { ConsultantForm } from '~/packages/specific/ConsultantForm/models/ConsultantForm';
import { getConsultantForm } from '~/packages/specific/ConsultantForm/services/getConsultantForm';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';

type LoaderResponse = SimpleResponse<{ consultantForm: ConsultantForm }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  isCanAccessRoute({ accept: [Role.SuperAdmin, Role.Consultant, Role.Sale] });
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
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/consultant-form')}>
            {t('consultant_form:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('consultant_form:consultant_form_with_name', {
            name: loaderData.info?.consultantForm.student?.fullName,
          })}
          onBack={() => navigate('/consultant-form')}
        />
        <div className="flex-1 mb-4">
          <Detail consultantForm={loaderData.info?.consultantForm} />
        </div>
        {isCanShow({ accept: [Role.SuperAdmin, Role.Consultant] }) && (
          <Footer
            onDelete={() => setIsOpenModalDeleteConsultantForm(loaderData.info?.consultantForm.id ?? false)}
            onEdit={() => navigate(`/consultant-form/${loaderData.info?.consultantForm.id}/edit`)}
          />
        )}
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

export default Page;
