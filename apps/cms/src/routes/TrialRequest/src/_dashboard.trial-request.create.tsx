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
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { StudyMode } from '~/packages/common/SelectVariants/StudyMode/constants/StudyMode';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudent } from '~/packages/specific/Student/services/getStudent';
import { FormMutation, FormValues } from '~/packages/specific/TrialRequest/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/TrialRequest/components/FormMutation/zodResolver';
import { createTrialRequest } from '~/packages/specific/TrialRequest/services/createTrialRequest';
import { createUrlSearchParamsUtils } from '~/packages/specific/TrialRequest/utils/createUrlSearchParamsUtils';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant] });
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await createTrialRequest({
        demoType: data.classType,
        consultantId: data.consultantId,
        courseRoadmapId: data.courseRoadmapId,
        studyDate: data.learningDate,
        learningOrganizationId: data.learningOrganizationId,
        studyTime: data.learningTime,
        studyMode: data.learningType,
        notes: data.notes,
        status: data.status,
        studentId: data.studentId,
        adminId: data.adminId,
        lecturerId: data.lectureId,
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
  await isCanAccessRoute({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant] });
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
  const { t } = useTranslation(['trial_request']);

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
          message: t('trial_request:create_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('trial_request:create_success') });
        navigate('/trial-request');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  const session = getSession();
  return (
    <div className="flex flex-col h-full">
      <Header title={t('trial_request:add_trial')} onBack={() => navigate('/trial-request')} />
      <div className="flex-1 mb-4">
        <FormMutation
          isSubmiting={isSubmiting}
          uid={FormCreateUid}
          defaultValues={{
            studentId: loaderData.student?.id,
            displayStudentPhone: loaderData.student?.phoneNumber,
            displayStudentSchool: loaderData.student?.school?.id,
            displayStudentSource: loaderData.student?.source,
            displaySaleEmployees: loaderData.student?.supporterIds,
            consultantId: session?.profile?.roles.includes(Role.Lecturer) ? session.profile.id : undefined,
            learningOrganizationId: session?.profile?.organizationId,
            learningType: StudyMode.Offline,
          }}
        />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onCancel={() => navigate('/trial-request')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
