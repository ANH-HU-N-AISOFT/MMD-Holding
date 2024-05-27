import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeletePromotionResponse,
  action as actionDeletePromotion,
} from './_dashboard.promotion.$id.delete';
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
import { Detail } from '~/packages/specific/Promotion/components/Detail/Detail';
import { Promotion } from '~/packages/specific/Promotion/models/Promotion';
import { getPromotion } from '~/packages/specific/Promotion/services/getPromotion';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';

type LoaderResponse = SimpleResponse<{ promotion: Promotion }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin, Role.Consultant, Role.Sale] });
  if (!params['id']) {
    return redirect('/promotion', {});
  }
  try {
    const response = await getPromotion({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        promotion: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['promotion', 'page404']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deletePromotionFetcher = useFetcher<typeof actionDeletePromotion>();

  const isDeleting = useMemo(() => {
    return deletePromotionFetcher.state === 'loading' || deletePromotionFetcher.state === 'submitting';
  }, [deletePromotionFetcher]);
  const [isOpenModalDeletePromotion, setIsOpenModalDeletePromotion] = useState<string | false>(false);

  const handleDelete = () => {
    deletePromotionFetcher.submit({}, { method: 'DELETE', action: `/promotion/${isOpenModalDeletePromotion}/delete` });
  };

  useEffect(() => {
    if (deletePromotionFetcher.data && deletePromotionFetcher.state === 'idle') {
      const response = deletePromotionFetcher.data as ActionDeletePromotionResponse;
      if (response.hasError) {
        notification.error({
          message: t('promotion:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('promotion:delete_success') });
        navigate('/promotion');
        setIsOpenModalDeletePromotion(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletePromotionFetcher.state]);
  //#endregion

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('promotion:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/promotion')}>
            {t('promotion:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('promotion:promotion_with_name', {
            name: loaderData.info?.promotion.name,
          })}
          onBack={() => navigate('/promotion')}
        />
        <div className="flex-1 mb-4">
          <Detail promotion={loaderData.info?.promotion} />
        </div>
        {isCanShow({ accept: [Role.Admin] }) && (
          <Footer
            onDelete={() => setIsOpenModalDeletePromotion(loaderData.info?.promotion.id ?? false)}
            onEdit={() => navigate(`/promotion/${loaderData.info?.promotion.id}/edit`)}
          />
        )}
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeletePromotion}
        onCancel={() => setIsOpenModalDeletePromotion(false)}
        onOk={handleDelete}
        title={t('promotion:delete_title')}
        description={t('promotion:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;