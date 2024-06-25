import { HomeOutlined } from '@ant-design/icons';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Result, notification } from 'reactjs';
import {
  ActionResponse as ActionResetPasswordResponse,
  action as actionResetPassword,
} from './_dashboard.student.$id.reset-password';
import { isCanEditStudent } from './utils/Is';
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
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { Edit } from '~/packages/specific/Student/components/Edit/Edit';
import { FormValues } from '~/packages/specific/Student/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Student/components/FormMutation/zodResolver';
import {
  FormValues as FormResetPasswordValues,
  ResetPassword,
} from '~/packages/specific/Student/components/ResetPassword/ResetPassword';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudent } from '~/packages/specific/Student/services/getStudent';
import { updateStudent } from '~/packages/specific/Student/services/updateStudent';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request, params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanEditStudent);

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
          address: data.personalInformation.currentAddress ?? undefined,
          birthday: data.personalInformation.dateOfBirth ?? undefined,
          districtId: data.personalInformation.district ?? undefined,
          email: data.personalInformation.email ?? undefined,
          fullName: data.personalInformation.fullName,
          gender: data.personalInformation.gender ?? undefined,
          notifyParentsOfResults: data.personalInformation.notifyResultToParent ?? undefined,
          organizationIds: data.personalInformation.departments,
          parentPhoneNumber: data.personalInformation.parentPhone ?? undefined,
          phoneNumber: data.personalInformation.phone,
          schoolId: data.personalInformation.school ?? undefined,
          source: data.personalInformation.source ?? undefined,
          supporterIds: data.personalInformation.saleEmployees ?? undefined,
          username: data.roleSystem.username,
          provinceId: data.personalInformation.city ?? undefined,
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

type LoaderResponse = SimpleResponse<{ student: Student }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanEditStudent);

  if (!params['id']) {
    return redirect('/student', {});
  }
  try {
    const response = await getStudent({ id: params['id'] });
    return json({
      hasError: false,
      info: {
        student: response,
      },
      message: '',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
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

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('student:not_found')}
        extra={
          <Button icon={<HomeOutlined />} color="primary" onClick={() => navigate('/student')}>
            {t('student:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          title={t('student_with_name_n_code', {
            name: loaderData.info?.student.fullName,
            code: loaderData.info?.student?.code,
          })}
          onBack={() => navigate('/student')}
        />
        <div className="mb-4 flex-1">
          <Edit
            onResetPassword={() => setIsOpenModalResetPassword(loaderData.info?.student ?? false)}
            isSubmiting={isSubmiting}
            uid={FormUpdate}
            student={loaderData.info?.student}
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

export const shouldRevalidate = preventRevalidateOnEditPage;

export default Page;
