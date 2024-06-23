import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDefaultListingTrialRequestsUrl } from '../constants/getDefaultFilterUrl';
import {
  ActionResponse as ActionDeleteTrialResponse,
  action as actionDeleteTrial,
} from './_dashboard.trial-request.$id.delete';
import { isCanDeleteTrialRequest, isCanEditTrialRequest, isCanReadTrialRequest } from './utils/Is';
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
import { Detail } from '~/packages/specific/TrialRequest/components/Detail/Detail';
import { TrialRequest } from '~/packages/specific/TrialRequest/models/TrialRequest';
import { getTrialRequest } from '~/packages/specific/TrialRequest/services/getTrialRequest';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnDetailPage } from '~/utils/functions/preventRevalidateOnDetailPage';

type LoaderResponse = SimpleResponse<{ trialRequest: TrialRequest }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanReadTrialRequest);
  if (!params['id']) {
    return redirect(getDefaultListingTrialRequestsUrl(), {});
  }
  try {
    const response = await getTrialRequest({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        trialRequest: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['trial_request', 'page404']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteTrialFetcher = useFetcher<typeof actionDeleteTrial>();

  const isDeleting = useMemo(() => {
    return deleteTrialFetcher.state === 'loading' || deleteTrialFetcher.state === 'submitting';
  }, [deleteTrialFetcher]);
  const [isOpenModalDeleteTrial, setIsOpenModalDeleteTrial] = useState<string | false>(false);

  const handleDelete = () => {
    deleteTrialFetcher.submit({}, { method: 'DELETE', action: `/trial-request/${isOpenModalDeleteTrial}/delete` });
  };

  useEffect(() => {
    if (deleteTrialFetcher.data && deleteTrialFetcher.state === 'idle') {
      const response = deleteTrialFetcher.data as ActionDeleteTrialResponse;
      if (response.hasError) {
        notification.error({
          message: t('trial_request:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('trial_request:delete_success') });
        navigate(getDefaultListingTrialRequestsUrl());
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
        title={t('trial_request:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate(getDefaultListingTrialRequestsUrl())}>
            {t('trial_request:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('trial_request:trial_with_student_name', {
            name: loaderData.info?.trialRequest.student?.fullName,
          })}
          onBack={() => navigate(getDefaultListingTrialRequestsUrl())}
        />
        <div className="flex-1 mb-4">
          <Detail trialRequest={loaderData.info?.trialRequest} />
        </div>
        <Footer
          onDelete={() => setIsOpenModalDeleteTrial(loaderData.info?.trialRequest.id ?? false)}
          onEdit={() => navigate(`/trial-request/${loaderData.info?.trialRequest.id}/edit`)}
          deletable={isCanShow(isCanDeleteTrialRequest)}
          editable={isCanShow(isCanEditTrialRequest)}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteTrial}
        onCancel={() => setIsOpenModalDeleteTrial(false)}
        onOk={handleDelete}
        title={t('trial_request:delete_title')}
        description={t('trial_request:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnDetailPage;

export default Page;
