import { notification } from 'antd';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SimpleActionResponse } from '~/@types/SimpleActionResponse';
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
import { Edit } from '~/packages/specific/DepartmentList/components/Edit/Edit';
import { FormValues } from '~/packages/specific/DepartmentList/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/DepartmentList/components/FormMutation/zodResolver';
import { Department } from '~/packages/specific/DepartmentList/models/Department';
import { getDepartment } from '~/packages/specific/DepartmentList/services/getDepartment';
import { updateDepartment } from '~/packages/specific/DepartmentList/services/updateDepartment';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

export type ActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async ({ request, params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  if (!params['id']) {
    return redirect('/department-list', {});
  }
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await updateDepartment({
        id: params['id'],
        data: {
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
          id: params['id'],
        },
      });
      return json({ hasError: false, message: 'Updated' });
    }
    return json(...handleFormResolverError<FormValues>(errors));
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<{ department: Department }>> => {
  if (!params['id']) {
    return redirect('/department-list', {});
  }
  try {
    const response = await getDepartment({ id: params['id'] });
    return json({
      department: response as any,
    });
  } catch (error) {
    console.log(error);
    return redirect('/500', { reason: '' });
  }
};

const FormUpdate = 'FORM_UPDATE';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['department']);

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
          message: t('department:update_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('department:update_success') });
        navigate('/department-list');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);
  return (
    <div className="flex flex-col h-full">
      <Header
        title={t('department_with_name', { name: loaderData.department.name })}
        onBack={() => navigate('/department-list')}
      />
      <div className="flex-1">
        <Edit isSubmiting={isSubmiting} uid={FormUpdate} department={loaderData.department} />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormUpdate, htmlType: 'submit' }}
        onCancel={() => navigate('/department-list')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
