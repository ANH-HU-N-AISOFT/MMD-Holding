import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getDefaultListingAppointmentsUrl } from '../constants/getDefaultFilterUrl';
import { isCanEditAppointment } from './utils/Is';
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
import { Edit } from '~/packages/specific/Appointment/components/Edit/Edit';
import { FormValues } from '~/packages/specific/Appointment/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Appointment/components/FormMutation/zodResolver';
import { Appointment } from '~/packages/specific/Appointment/models/Appointment';
import { getAppointment } from '~/packages/specific/Appointment/services/getAppointment';
import { updateAppointment } from '~/packages/specific/Appointment/services/updateAppointment';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request, params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanEditAppointment);
  if (!params['id']) {
    return redirect(getDefaultListingAppointmentsUrl(), {});
  }
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await updateAppointment({
        id: params['id'],
        data: {
          id: params['id'],
          adminId: data.admin ?? undefined,
          appointmentDate: data.appointmentDate,
          appointmentTime: data.appointmentTime,
          consultantId: data.consultant,
          demands: data.demand,
          extraDemand: data.extraDemand ?? undefined,
          notes: data.note ?? undefined,
          status: data.appointmentStatus,
          studentId: data.studentId,
          test: data.ieltsTestType,
          testerId: data.tester ?? undefined,
          testingShiftId: data.testShiftId,
          testOrganizationId: data.expectInspectionDepartmentId,
          testType: data.testType,
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

type LoaderResponse = SimpleResponse<{ appointment: Appointment }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanEditAppointment);
  if (!params['id']) {
    return redirect(getDefaultListingAppointmentsUrl(), {});
  }
  try {
    const response = await getAppointment({ id: params['id'] });
    return json({
      info: {
        appointment: response,
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
  const { t } = useTranslation(['appointment']);

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
          message: t('appointment:update_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('appointment:update_success') });
        navigate(getDefaultListingAppointmentsUrl());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('appointment:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate(getDefaultListingAppointmentsUrl())}>
            {t('appointment:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        title={t('appointment:appointment_with_student_name', { name: loaderData.info?.appointment.student?.fullName })}
        onBack={() => navigate(getDefaultListingAppointmentsUrl())}
      />
      <div className="flex-1 mb-4">
        <Edit isSubmiting={isSubmiting} uid={FormUpdate} appointment={loaderData.info?.appointment} />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormUpdate, htmlType: 'submit' }}
        onCancel={() => navigate(getDefaultListingAppointmentsUrl())}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnEditPage;

export default Page;
