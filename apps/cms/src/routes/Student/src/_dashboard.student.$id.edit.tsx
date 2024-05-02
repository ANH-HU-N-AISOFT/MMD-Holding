import { notification } from 'antd';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionResetPasswordResponse,
  action as actionResetPassword,
} from './_dashboard.student.$id.reset-password';
import { SimpleActionResponse } from '~/@types/SimpleActionResponse';
import { Modal } from '~/components/AntCustom/Modal';
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
  useFetcher,
  useLoaderData,
  useNavigate,
  useNavigation,
} from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { Edit } from '~/packages/specific/Student/components/Edit/Edit';
import { FormValues } from '~/packages/specific/Student/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Student/components/FormMutation/zodResolver';
import {
  ResetPassword,
  FormValues as FormResetPasswordValues,
} from '~/packages/specific/Student/components/ResetPassword/ResetPassword';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudent } from '~/packages/specific/Student/services/getStudent';
import { updateStudent } from '~/packages/specific/Student/services/updateStudent';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async ({ request, params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin] });

  if (!params['id']) {
    return redirect('/student', {});
  }
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver({ t: t as TFunction<any>, needPassword: false }),
    );
    if (data) {
      await updateStudent({
        id: params['id'],
        data: {
          id: params['id'],
          accessStatus: data.roleSystem.accessStatus,
          address: data.personalInformation.currentAddress,
          birthday: data.personalInformation.dateOfBirth,
          districtId: data.personalInformation.district,
          email: data.personalInformation.email,
          fullName: data.personalInformation.fullName,
          gender: data.personalInformation.gender,
          notifyParentsOfResults: data.personalInformation.notifyResultToParent,
          organizationIds: [data.personalInformation.department],
          parentPhone: data.personalInformation.parentPhone,
          password: data.roleSystem.password,
          phoneNumber: data.personalInformation.phone,
          school: data.personalInformation.school,
          source: data.personalInformation.source,
          supporterIds: data.personalInformation.saleEmployees,
          username: data.roleSystem.username,
          provinceId: data.personalInformation.city,
        },
      });
      return json({ hasError: false, message: 'Updated' });
    }
    return json(...handleFormResolverError<FormValues>(errors));
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<{ student: Student }>> => {
  isCanAccessRoute({ accept: [Role.Admin] });

  if (!params['id']) {
    return redirect('/student', {});
  }
  try {
    const response = await getStudent({ id: params['id'] });
    return json({
      student: response,
    });
  } catch (error) {
    console.log(error);
    return redirect('/500', { reason: '' });
  }
};

const FormUpdate = 'FORM_UPDATE';
const FormResetPassword = 'FormResetPassword';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['student']);

  const loaderData = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  //#region Reset password
  const resetPasswordFetcher = useFetcher<typeof actionResetPassword>();

  const isReseting = useMemo(() => {
    return resetPasswordFetcher.state === 'loading' || resetPasswordFetcher.state === 'submitting';
  }, [resetPasswordFetcher]);
  const [isOpenModalResetPassword, setIsOpenModalResetPassword] = useState<Student | false>(false);

  const handleReset = (values: FormResetPasswordValues) => {
    if (isOpenModalResetPassword) {
      resetPasswordFetcher.submit(fetcherFormData.encrypt(values), {
        method: 'DELETE',
        action: `/student/${isOpenModalResetPassword.id}/reset-password`,
      });
    }
  };

  useEffect(() => {
    if (resetPasswordFetcher.data && resetPasswordFetcher.state === 'idle') {
      const response = resetPasswordFetcher.data as ActionResetPasswordResponse;
      if (response.hasError) {
        notification.error({
          message: t('student:reset_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('student:reset_success') });
        setIsOpenModalResetPassword(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordFetcher.state]);
  //#endregion

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('student:update_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('student:update_success') });
        navigate('/student');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);
  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('student_with_name_n_code', {
            name: loaderData.student.fullName,
            code: loaderData.student?.code,
          })}
          onBack={() => navigate('/student')}
        />
        <div className="flex-1">
          <Edit
            onResetPassword={() => setIsOpenModalResetPassword(loaderData.student)}
            isSubmiting={isSubmiting}
            uid={FormUpdate}
            student={loaderData.student}
          />
        </div>
        <Footer
          isLoading={isSubmiting}
          okConfirmProps={{ form: FormUpdate, htmlType: 'submit' }}
          onCancel={() => navigate('/student')}
        />
      </div>

      <Modal
        title={t('student:reset_password')}
        open={!!isOpenModalResetPassword}
        onCancel={() => setIsOpenModalResetPassword(false)}
        okButtonProps={{ htmlType: 'submit', form: FormResetPassword }}
        destroyOnClose
      >
        <ResetPassword isSubmiting={isReseting} uid={FormResetPassword} onSubmit={handleReset} defaultValues={{}} />
      </Modal>
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
