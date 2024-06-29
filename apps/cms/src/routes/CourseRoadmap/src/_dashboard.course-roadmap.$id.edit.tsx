import { HomeOutlined } from '@ant-design/icons';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Result, notification } from 'reactjs';
import { isCanEditCourseRoadmap } from './utils/Is';
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
} from '~/overrides/remix';
import { getValidatedFormData } from '~/overrides/remix-hook-form';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { Edit } from '~/packages/specific/CourseRoadmap/components/Edit/Edit';
import { FormValues } from '~/packages/specific/CourseRoadmap/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/CourseRoadmap/components/FormMutation/zodResolver';
import { CourseRoadmap } from '~/packages/specific/CourseRoadmap/models/CourseRoadmap';
import { getCourseRoadmap } from '~/packages/specific/CourseRoadmap/services/getCourseRoadmap';
import { updateCourseRoadmap } from '~/packages/specific/CourseRoadmap/services/updateCourseRoadmap';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request, params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanEditCourseRoadmap);
  if (!params['id']) {
    return redirect('/course-roadmap', {});
  }
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await updateCourseRoadmap({
        id: params['id'],
        data: {
          id: params['id'],
          name: data.name,
          notes: data.description ?? null,
          status: data.status,
          code: data.code,
          courseId: data.courseId,
          numberSessions: data.numberSessions,
          price: data.price,
          sessionDuration: data.sessionDuration,
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

type LoaderResponse = SimpleResponse<{ courseRoadmap: CourseRoadmap }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanEditCourseRoadmap);
  if (!params['id']) {
    return redirect('/course-roadmap', {});
  }
  try {
    const response = await getCourseRoadmap({ id: params['id'] });
    return json({
      info: {
        courseRoadmap: response,
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
  const { t } = useTranslation(['course_roadmap']);

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
          message: t('course_roadmap:update_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('course_roadmap:update_success') });
        navigate('/course-roadmap');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('course_roadmap:not_found')}
        extra={
          <Button icon={<HomeOutlined />} color="primary" onClick={() => navigate('/course-roadmap')}>
            {t('course_roadmap:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <Header
        title={t('course_roadmap:course_roadmap_with_name', { name: loaderData.info?.courseRoadmap.name })}
        onBack={() => navigate('/course-roadmap')}
      />
      <div className="mb-4 flex-1">
        <Edit isSubmiting={isSubmiting} uid={FormUpdate} courseRoadmap={loaderData.info?.courseRoadmap} />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormUpdate, htmlType: 'submit' }}
        onCancel={() => navigate('/course-roadmap')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnEditPage;

export default Page;
