import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from 'reactjs';
import { isCanCreatePromotion } from './utils/Is';
import { Footer } from '~/components/Mutation/Footer';
import { Header } from '~/components/Mutation/Header';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { ActionFunctionArgs, TypedResponse, json, useActionData, useNavigate, useNavigation } from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { FormMutation, FormValues } from '~/packages/specific/Promotion/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Promotion/components/FormMutation/zodResolver';
import { PromotionType } from '~/packages/specific/Promotion/constants/PromotionType';
import { PromotionScope } from '~/packages/specific/Promotion/models/PromotionScope';
import { PromotionStatus } from '~/packages/specific/Promotion/models/PromotionStatus';
import { createPromotion } from '~/packages/specific/Promotion/services/createPromotion';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnCreatePage } from '~/utils/functions/preventRevalidateOnCreatePage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanCreatePromotion);
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await createPromotion({
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

export const loader = async () => {
  await isCanAccessRoute(isCanCreatePromotion);
  return json({});
};

const FormCreateUid = 'FORM_CREATE';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['promotion']);

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('promotion:create_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('promotion:create_success') });
        navigate('/promotion');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);
  return (
    <div className="flex h-full flex-col">
      <Header title={t('promotion:add_promotion')} onBack={() => navigate('/promotion')} />
      <div className="mb-4 flex-1">
        <FormMutation
          isSubmiting={isSubmiting}
          uid={FormCreateUid}
          defaultValues={{
            status: PromotionStatus.Active,
            type: PromotionType.PercentageDiscount,
            scope: PromotionScope.All,
          }}
        />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onCancel={() => navigate('/promotion')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnCreatePage;

export default Page;
