import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from 'reactjs';
import { getDefaultListingTrialRequestsUrl } from '../constants/getDefaultFilterUrl';
import { isCanCreateTrialRequest } from './utils/Is';
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
} from '~/overrides/remix';
import { getValidatedFormData } from '~/overrides/remix-hook-form';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudent } from '~/packages/specific/Student/services/getStudent';
import { FormMutation, FormValues } from '~/packages/specific/TrialRequest/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/TrialRequest/components/FormMutation/zodResolver';
import { StudyMode } from '~/packages/specific/TrialRequest/models/StudyMode';
import { createTrialRequest } from '~/packages/specific/TrialRequest/services/createTrialRequest';
import { createUrlSearchParamsUtils } from '~/packages/specific/TrialRequest/utils/createUrlSearchParamsUtils';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnCreatePage } from '~/utils/functions/preventRevalidateOnCreatePage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanCreateTrialRequest);
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
        studyDate: data.learningDate ?? null,
        learningOrganizationId: data.learningOrganizationId,
        studyTime: data.learningTime ?? null,
        studyMode: data.studyMode,
        notes: data.notes ?? null,
        status: data.status,
        studentId: data.studentId,
        adminId: data.adminId ?? null,
        lecturerId: data.lectureId ?? null,
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
  await isCanAccessRoute(isCanCreateTrialRequest);
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
        navigate(getDefaultListingTrialRequestsUrl());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  const session = getSession();
  return (
    <div className="flex h-full flex-col">
      <Header title={t('trial_request:add_trial')} onBack={() => navigate(getDefaultListingTrialRequestsUrl())} />
      <div className="mb-4 flex-1">
        <FormMutation
          trialRequest={undefined}
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
            studyMode: StudyMode.Offline,
          }}
        />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onCancel={() => navigate(getDefaultListingTrialRequestsUrl())}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnCreatePage;

export default Page;
