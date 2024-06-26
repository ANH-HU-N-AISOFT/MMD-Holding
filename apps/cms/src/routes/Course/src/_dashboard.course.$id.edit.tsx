import { HomeOutlined } from '@ant-design/icons';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Result, notification } from 'reactjs';
import { isCanEditCourse } from './utils/Is';
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
import { Edit } from '~/packages/specific/Course/components/Edit/Edit';
import { FormValues } from '~/packages/specific/Course/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Course/components/FormMutation/zodResolver';
import { Course } from '~/packages/specific/Course/models/Course';
import { getCourse } from '~/packages/specific/Course/services/getCourse';
import { updateCourse } from '~/packages/specific/Course/services/updateCourse';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request, params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanEditCourse);
  if (!params['id']) {
    return redirect('/course', {});
  }
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await updateCourse({
        id: params['id'],
        data: {
          id: params['id'],
          name: data.name,
          notes: data.description,
          status: data.status,
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

type LoaderResponse = SimpleResponse<{ course: Course }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanEditCourse);
  if (!params['id']) {
    return redirect('/course', {});
  }
  try {
    const response = await getCourse({ id: params['id'] });
    return json({
      info: {
        course: response,
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
  const { t } = useTranslation(['course']);

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
          message: t('course:update_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('course:update_success') });
        navigate('/course');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('course:not_found')}
        extra={
          <Button icon={<HomeOutlined />} color="primary" onClick={() => navigate('/course')}>
            {t('course:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <Header
        title={t('course:course_with_name', { name: loaderData.info?.course.name })}
        onBack={() => navigate('/course')}
      />
      <div className="mb-4 flex-1">
        <Edit isSubmiting={isSubmiting} uid={FormUpdate} course={loaderData.info?.course} />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormUpdate, htmlType: 'submit' }}
        onCancel={() => navigate('/course')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnEditPage;

export default Page;
