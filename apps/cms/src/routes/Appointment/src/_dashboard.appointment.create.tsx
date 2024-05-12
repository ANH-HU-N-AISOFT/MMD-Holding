import { notification } from 'antd';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
import { AppointmentStatus } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatus';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { TestType } from '~/packages/common/SelectVariants/TestType/constants/TestType';
import { FormMutation, FormValues } from '~/packages/specific/Appointment/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Appointment/components/FormMutation/zodResolver';
import { createAppointment } from '~/packages/specific/Appointment/services/createAppointment';
import { createUrlSearchParamsUtils } from '~/packages/specific/Appointment/utils/createUrlSearchParamsUtils';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudent } from '~/packages/specific/Student/services/getStudent';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin] });
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await createAppointment({
        adminId: data.admin,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        consultantId: data.consultant,
        demands: data.demand,
        extraDemand: data.extraDemand,
        notes: data.note,
        status: data.appointmentStatus,
        studentId: data.studentId,
        test: data.ieltsTestType,
        testerId: data.tester,
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
  isCanAccessRoute({ accept: [Role.Admin] });
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
        navigate('/appointment');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);
  return (
    <div className="flex flex-col h-full">
      <Header title={t('appointment:add_appointment')} onBack={() => navigate('/appointment')} />
      <div className="flex-1 mb-4">
        <FormMutation
          // FIXME: Nếu lịch hẹn được tạo từ màn danh sách học viên hoặc chi tiết học viên, …, thông tin học viên được autofill
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
        onCancel={() => navigate('/appointment')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
