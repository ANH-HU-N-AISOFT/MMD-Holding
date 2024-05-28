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
import { LearningType } from '~/packages/common/SelectVariants/LearningType/constants/LearningType';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudent } from '~/packages/specific/Student/services/getStudent';
import { FormMutation, FormValues } from '~/packages/specific/Trial/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Trial/components/FormMutation/zodResolver';
import { createTrial } from '~/packages/specific/Trial/services/createTrial';
import { createUrlSearchParamsUtils } from '~/packages/specific/Trial/utils/createUrlSearchParamsUtils';
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
      await createTrial({
        classType: data.classType,
        consultantId: data.consultantId,
        courseRoadmapId: data.courseRoadmapId,
        learningDate: data.learningDate,
        learningOrganizationId: data.learningOrganizationId,
        learningTime: data.learningTime,
        learningType: data.learningType,
        notes: data.notes,
        status: data.status,
        studentId: data.studentId,
        adminId: data.adminId,
        lectureId: data.lectureId,
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
  const { t } = useTranslation(['trial']);

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
          message: t('trial:create_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('trial:create_success') });
        navigate('/trial');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  const session = getSession();
  return (
    <div className="flex flex-col h-full">
      <Header title={t('trial:add_trial')} onBack={() => navigate('/trial')} />
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
            learningType: LearningType.OFFLINE,
          }}
        />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onCancel={() => navigate('/trial')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
