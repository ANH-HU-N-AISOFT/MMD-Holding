import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeleteTrialResponse,
  action as actionDeleteTrial,
} from './_dashboard.trial.$id.delete';
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
import { Detail } from '~/packages/specific/Trial/components/Detail/Detail';
import { Trial } from '~/packages/specific/Trial/models/Trial';
import { getTrial } from '~/packages/specific/Trial/services/getTrial';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';

type LoaderResponse = SimpleResponse<{ trial: Trial }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin, Role.Consultant, Role.Sale] });
  if (!params['id']) {
    return redirect('/trial', {});
  }
  try {
    const response = await getTrial({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        trial: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['trial', 'page404']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteTrialFetcher = useFetcher<typeof actionDeleteTrial>();

  const isDeleting = useMemo(() => {
    return deleteTrialFetcher.state === 'loading' || deleteTrialFetcher.state === 'submitting';
  }, [deleteTrialFetcher]);
  const [isOpenModalDeleteTrial, setIsOpenModalDeleteTrial] = useState<string | false>(false);

  const handleDelete = () => {
    deleteTrialFetcher.submit({}, { method: 'DELETE', action: `/trial/${isOpenModalDeleteTrial}/delete` });
  };

  useEffect(() => {
    if (deleteTrialFetcher.data && deleteTrialFetcher.state === 'idle') {
      const response = deleteTrialFetcher.data as ActionDeleteTrialResponse;
      if (response.hasError) {
        notification.error({
          message: t('trial:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('trial:delete_success') });
        navigate('/trial');
        setIsOpenModalDeleteTrial(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteTrialFetcher.state]);
  //#endregion

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('trial:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/trial')}>
            {t('trial:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('trial:trial_with_student_name', {
            name: loaderData.info?.trial.student?.fullName,
          })}
          onBack={() => navigate('/trial')}
        />
        <div className="flex-1 mb-4">
          <Detail trial={loaderData.info?.trial} />
        </div>
        {isCanShow({ accept: [Role.Admin] }) && (
          <Footer
            onDelete={() => setIsOpenModalDeleteTrial(loaderData.info?.trial.id ?? false)}
            onEdit={() => navigate(`/trial/${loaderData.info?.trial.id}/edit`)}
          />
        )}
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteTrial}
        onCancel={() => setIsOpenModalDeleteTrial(false)}
        onOk={handleDelete}
        title={t('trial:delete_title')}
        description={t('trial:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
