import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from 'reactjs';
import { getDefaultListingAppointmentsUrl } from '../constants/getDefaultFilterUrl';
import { isCanCreateAppointment } from './utils/Is';
import { Footer } from '~/components/Mutation/Footer';
import { Header } from '~/components/Mutation/Header';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  TypedResponse,
  json,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { FormMutation, FormValues } from '~/packages/specific/Appointment/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Appointment/components/FormMutation/zodResolver';
import { AppointmentStatus } from '~/packages/specific/Appointment/models/AppointmentStatus';
import { TestType } from '~/packages/specific/Appointment/models/TestType';
import { createAppointment } from '~/packages/specific/Appointment/services/createAppointment';
import { createUrlSearchParamsUtils } from '~/packages/specific/Appointment/utils/createUrlSearchParamsUtils';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudent } from '~/packages/specific/Student/services/getStudent';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { preventRevalidateOnCreatePage } from '~/utils/functions/preventRevalidateOnCreatePage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanCreateAppointment);
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await createAppointment({
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

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<{ student: Student | undefined }>> => {
  await isCanAccessRoute(isCanCreateAppointment);
  try {
    const { studentId } = createUrlSearchParamsUtils.decrypt(request);
    if (studentId) {
      const response = await getStudent({ id: studentId });
      return json({
        student: response,
      });
    }
    return json({
      student: undefined,
    });
  } catch {
    return json({
      student: undefined,
    });
  }
};

const FormCreateUid = 'FORM_CREATE';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['appointment']);

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('appointment:create_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('appointment:create_success') });
        navigate(getDefaultListingAppointmentsUrl());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);
  return (
    <div className="flex h-full flex-col">
      <Header title={t('appointment:add_appointment')} onBack={() => navigate(getDefaultListingAppointmentsUrl())} />
      <div className="mb-4 flex-1">
        <FormMutation
          appointment={undefined}
          defaultValues={{
            appointmentStatus: AppointmentStatus.SCHEDULED,
            expectInspectionDepartmentId: getSession()?.profile?.organizationId,
            testType: TestType.OFFLINE,
            studentId: loaderData.student?.id,
            studentPhoneNumber: loaderData.student?.phoneNumber,
            studentSaleEmployees: loaderData.student?.supporters?.map(supporter => supporter.id),
            studentSchool: loaderData.student?.school?.id,
            studentSource: loaderData.student?.source,
          }}
          isSubmiting={isSubmiting}
          uid={FormCreateUid}
        />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onCancel={() => navigate(getDefaultListingAppointmentsUrl())}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnCreatePage;

export default Page;
