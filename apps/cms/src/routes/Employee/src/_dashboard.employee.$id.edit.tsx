import { HomeOutlined } from '@ant-design/icons';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Result, notification } from 'reactjs';
import {
  ActionResponse as ActionResetPasswordResponse,
  action as actionResetPassword,
} from './_dashboard.employee.$id.reset-password';
import { isCanEditEmployee } from './utils/Is';
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
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { Edit } from '~/packages/specific/Employee/components/Edit/Edit';
import { FormValues } from '~/packages/specific/Employee/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Employee/components/FormMutation/zodResolver';
import {
  FormValues as FormResetPasswordValues,
  ResetPassword,
} from '~/packages/specific/Employee/components/ResetPassword/ResetPassword';
import { Employee } from '~/packages/specific/Employee/models/Employee';
import { getEmployee } from '~/packages/specific/Employee/services/getEmployee';
import { updateEmployee } from '~/packages/specific/Employee/services/updateEmployee';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request, params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanEditEmployee);

  if (!params['id']) {
    return redirect('/employee', {});
  }
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver({ t: t as TFunction<any>, needPassword: false }),
    );
    if (data) {
      await updateEmployee({
        id: params['id'],
        data: {
          accessStatus: data.roleSystem.accessStatus,
          birthday: data.personalInformation.dateOfBirth,
          cmnd: data.personalInformation.citizenIdCard ?? undefined,
          contractEndDate: data.personnelRecord.contractEndEffectDate ?? undefined,
          contractStartDate: data.personnelRecord.contractStartEffectDate ?? undefined,
          contractType: data.personnelRecord.contractType ?? undefined,
          currentAddress: data.personalInformation.currentAddress ?? undefined,
          directManagerId: data.personnelRecord.directionManager ?? undefined,
          emergencyContactName: data.personalInformation.emergencyContactName,
          emergencyContactPhone: data.personalInformation.emergencyContactPhone,
          emergencyContactRelationship: data.personalInformation.emergencyContactRelationship ?? undefined,
          fullName: data.personalInformation.fullName,
          gender: data.personalInformation.gender,
          jobTitles: data.personnelRecord.jobTitles ?? [],
          nationality: data.personalInformation.region ?? undefined,
          notes: data.personalInformation.notes ?? undefined,
          organizationId: data.personnelRecord.department,
          permanentAddress: data.personalInformation.residenceAddress ?? undefined,
          personalEmail: data.personalInformation.personalEmail,
          phoneNumber: data.personalInformation.phone,
          roles: data.roleSystem.roles,
          username: data.roleSystem.username,
          workEmail: data.personalInformation.workEmail,
          workStatus: data.personnelRecord.workStatus,
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

type LoaderResponse = SimpleResponse<{ employee: Employee }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanEditEmployee);

  if (!params['id']) {
    return redirect('/employee', {});
  }
  try {
    const response = await getEmployee({ id: params['id'] });
    return json({
      hasError: false,
      info: {
        employee: response,
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
  const { t } = useTranslation(['employee']);

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
  const [isOpenModalResetPassword, setIsOpenModalResetPassword] = useState<Employee | false>(false);

  const handleReset = (values: FormResetPasswordValues) => {
    if (isOpenModalResetPassword) {
      resetPasswordFetcher.submit(fetcherFormData.encrypt(values), {
        method: 'DELETE',
        action: `/employee/${isOpenModalResetPassword.employeeId}/reset-password`,
      });
    }
  };

  useEffect(() => {
    if (resetPasswordFetcher.data && resetPasswordFetcher.state === 'idle') {
      const response = resetPasswordFetcher.data as ActionResetPasswordResponse;
      if (response.hasError) {
        notification.error({
          message: t('employee:reset_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('employee:reset_success') });
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
          message: t('employee:update_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('employee:update_success') });
        navigate('/employee');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('employee:not_found')}
        extra={
          <Button icon={<HomeOutlined />} color="primary" onClick={() => navigate('/employee')}>
            {t('employee:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          title={t('employee_with_name_n_code', {
            name: loaderData.info?.employee.fullName,
            code: loaderData.info?.employee.employee?.code,
          })}
          onBack={() => navigate('/employee')}
        />
        <div className="mb-4 flex-1">
          <Edit
            onResetPassword={() => setIsOpenModalResetPassword(loaderData.info?.employee ?? false)}
            isSubmiting={isSubmiting}
            uid={FormUpdate}
            employee={loaderData.info?.employee}
          />
        </div>
        <Footer
          isLoading={isSubmiting}
          okConfirmProps={{ form: FormUpdate, htmlType: 'submit' }}
          onCancel={() => navigate('/employee')}
        />
      </div>

      <Modal
        title={t('employee:reset_password')}
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
