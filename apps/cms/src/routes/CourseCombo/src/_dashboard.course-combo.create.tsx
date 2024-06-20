import { notification } from 'antd';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isCanCreateCourseCombo } from './utils/Is';
import { Footer } from '~/components/Mutation/Footer';
import { Header } from '~/components/Mutation/Header';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { ActionFunctionArgs, TypedResponse, json, useActionData, useNavigate, useNavigation } from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { CourseStatus } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatus';
import { FormMutation, FormValues } from '~/packages/specific/CourseCombo/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/CourseCombo/components/FormMutation/zodResolver';
import { createCourseCombo } from '~/packages/specific/CourseCombo/services/createCourseCombo';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanCreateCourseCombo);
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await createCourseCombo({
        name: data.name,
        courseRoadmapIds: data.courseRoadmapIds,
        notes: data.description,
        status: data.status,
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

export const loader = async () => {
  await isCanAccessRoute(isCanCreateCourseCombo);
  return json({});
};

const FormCreateUid = 'FORM_CREATE';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['course_combo']);

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('course_combo:create_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('course_combo:create_success') });
        navigate('/course-combo');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);
  return (
    <div className="flex flex-col h-full">
      <Header title={t('course_combo:add_course_combo')} onBack={() => navigate('/course-combo')} />
      <div className="flex-1 mb-4">
        <FormMutation isSubmiting={isSubmiting} uid={FormCreateUid} defaultValues={{ status: CourseStatus.ACTIVE }} />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onCancel={() => navigate('/course-combo')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
