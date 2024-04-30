import { notification } from 'antd';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SimpleActionResponse } from '~/@types/SimpleActionResponse';
import { Footer } from '~/components/Mutation/Footer';
import { Header } from '~/components/Mutation/Header';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { ActionFunctionArgs, TypedResponse, json, useActionData, useNavigate, useNavigation } from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { FormMutation, FormValues } from '~/packages/specific/DepartmentList/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/DepartmentList/components/FormMutation/zodResolver';
import { createDepartment } from '~/packages/specific/DepartmentList/services/createDepartment';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

export type ActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await createDepartment({
        address: data.address,
        businessStatus: data.businessStatus,
        code: data.code,
        email: data.email,
        foundationDate: data.foundationDate,
        managementUnitId: data.manageDepartmentId,
        name: data.name,
        phoneNumber: data.phone,
        province: data.city,
        unitManagerId: data.presentDepartmentId,
      });
      return json({ hasError: false, message: 'Created' });
    }
    return json(...handleFormResolverError<FormValues>(errors));
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

const FormCreateUid = 'FORM_CREATE';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['department']);

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('department:create_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('department:create_success') });
        navigate('/department-list');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);
  return (
    <div className="flex flex-col h-full">
      <Header title={t('department:add_department')} onBack={() => navigate('/department-list')} />
      <div className="flex-1">
        <FormMutation isSubmiting={isSubmiting} uid={FormCreateUid} />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onCancel={() => navigate('/department-list')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
