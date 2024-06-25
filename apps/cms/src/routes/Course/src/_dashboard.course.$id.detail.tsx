import { HomeOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Result, notification } from 'reactjs';
import {
  ActionResponse as ActionDeleteCourseResponse,
  action as actionDeleteCourse,
} from './_dashboard.course.$id.delete';
import { isCanDeleteCourse, isCanEditCourse, isCanReadCourse } from './utils/Is';
import { Footer } from '~/components/Detail/Footer';
import { Header } from '~/components/Detail/Header';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import {
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
  useFetcher,
  useLoaderData,
  useNavigate,
} from '~/overrides/@remix';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { Detail } from '~/packages/specific/Course/components/Detail/Detail';
import { Course } from '~/packages/specific/Course/models/Course';
import { getCourse } from '~/packages/specific/Course/services/getCourse';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { isCanShow } from '~/packages/specific/Permission/isCan/isCanShow';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnDetailPage } from '~/utils/functions/preventRevalidateOnDetailPage';

type LoaderResponse = SimpleResponse<{ course: Course }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanReadCourse);
  if (!params['id']) {
    return redirect('/course', {});
  }
  try {
    const response = await getCourse({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        course: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['course', 'page404']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteCourseFetcher = useFetcher<typeof actionDeleteCourse>();

  const isDeleting = useMemo(() => {
    return deleteCourseFetcher.state === 'loading' || deleteCourseFetcher.state === 'submitting';
  }, [deleteCourseFetcher]);
  const [isOpenModalDeleteCourse, setIsOpenModalDeleteCourse] = useState<string | false>(false);

  const handleDelete = () => {
    deleteCourseFetcher.submit({}, { method: 'DELETE', action: `/course/${isOpenModalDeleteCourse}/delete` });
  };

  useEffect(() => {
    if (deleteCourseFetcher.data && deleteCourseFetcher.state === 'idle') {
      const response = deleteCourseFetcher.data as ActionDeleteCourseResponse;
      if (response.hasError) {
        notification.error({
          message: t('course:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('course:delete_success') });
        navigate('/course');
        setIsOpenModalDeleteCourse(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCourseFetcher.state]);
  //#endregion

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
    <>
      <div className="flex h-full flex-col">
        <Header
          title={t('course:course_with_name', {
            name: loaderData.info?.course.name,
          })}
          onBack={() => navigate('/course')}
        />
        <div className="mb-4 flex-1">
          <Detail course={loaderData.info?.course} />
        </div>
        <Footer
          onDelete={() => setIsOpenModalDeleteCourse(loaderData.info?.course.id ?? false)}
          onEdit={() => navigate(`/course/${loaderData.info?.course.id}/edit`)}
          deletable={isCanShow(isCanDeleteCourse)}
          editable={isCanShow(isCanEditCourse)}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteCourse}
        onCancel={() => setIsOpenModalDeleteCourse(false)}
        onOk={handleDelete}
        title={t('course:delete_title')}
        description={t('course:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnDetailPage;

export default Page;
