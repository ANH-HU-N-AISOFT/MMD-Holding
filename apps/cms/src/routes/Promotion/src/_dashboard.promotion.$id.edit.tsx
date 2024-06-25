import { HomeOutlined } from '@ant-design/icons';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Result, notification } from 'reactjs';
import { isCanEditPromotion } from './utils/Is';
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
} from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { PromotionType } from '~/packages/common/SelectVariants/PromotionType/constants/PromotionType';
import { Edit } from '~/packages/specific/Promotion/components/Edit/Edit';
import { FormValues } from '~/packages/specific/Promotion/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Promotion/components/FormMutation/zodResolver';
import { Promotion } from '~/packages/specific/Promotion/models/Promotion';
import { getPromotion } from '~/packages/specific/Promotion/services/getPromotion';
import { updatePromotion } from '~/packages/specific/Promotion/services/updatePromotion';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request, params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanEditPromotion);
  if (!params['id']) {
    return redirect('/promotion', {});
  }
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await updatePromotion({
        id: params['id'],
        data: {
          id: params['id'],
          code: data.code,
          endDate: data.endDate,
          feeDiscount: data.type === PromotionType.FeeDiscount ? data.promotionByMoney : undefined,
          giftDiscount: data.type === PromotionType.Gift ? data.promotionByGift : undefined,
          name: data.name,
          notes: data.note,
          organizationIds: data.departments,
          percentageDiscount: data.type === PromotionType.PercentageDiscount ? data.promotionByMoney : undefined,
          programType: data.type,
          scope: data.scope,
          startDate: data.startDate,
          status: data.status,
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

type LoaderResponse = SimpleResponse<{ promotion: Promotion }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanEditPromotion);
  if (!params['id']) {
    return redirect('/promotion', {});
  }
  try {
    const response = await getPromotion({ id: params['id'] });
    return json({
      info: {
        promotion: response,
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
  const { t } = useTranslation(['promotion']);

  const loaderData = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('promotion:update_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('promotion:update_success') });
        navigate('/promotion');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('promotion:not_found')}
        extra={
          <Button icon={<HomeOutlined />} color="primary" onClick={() => navigate('/promotion')}>
            {t('promotion:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <Header
        title={t('promotion:promotion_with_name', { name: loaderData.info?.promotion.name })}
        onBack={() => navigate('/promotion')}
      />
      <div className="mb-4 flex-1">
        <Edit isSubmiting={isSubmiting} uid={FormUpdate} promotion={loaderData.info?.promotion} />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormUpdate, htmlType: 'submit' }}
        onCancel={() => navigate('/promotion')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnEditPage;

export default Page;
