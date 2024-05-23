import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeleteCourseResponse,
  action as actionDeleteCourse,
} from './_dashboard.course-roadmap.$id.delete';
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
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { Detail } from '~/packages/specific/CourseRoadmap/components/Detail/Detail';
import { CourseRoadmap } from '~/packages/specific/CourseRoadmap/models/CourseRoadmap';
import { getCourseRoadmap } from '~/packages/specific/CourseRoadmap/services/getCourseRoadmap';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';

type LoaderResponse = SimpleResponse<{ courseRoadmap: CourseRoadmap }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  isCanAccessRoute({ accept: [Role.Admin, Role.Consultant, Role.Sale] });
  if (!params['id']) {
    return redirect('/course-roadmap', {});
  }
  try {
    const response = await getCourseRoadmap({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        courseRoadmap: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['course_roadmap', 'page404']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteCourseFetcher = useFetcher<typeof actionDeleteCourse>();

  const isDeleting = useMemo(() => {
    return deleteCourseFetcher.state === 'loading' || deleteCourseFetcher.state === 'submitting';
  }, [deleteCourseFetcher]);
  const [isOpenModalDeleteCourse, setIsOpenModalDeleteCourse] = useState<string | false>(false);

  const handleDelete = () => {
    deleteCourseFetcher.submit({}, { method: 'DELETE', action: `/course-roadmap/${isOpenModalDeleteCourse}/delete` });
  };

  useEffect(() => {
    if (deleteCourseFetcher.data && deleteCourseFetcher.state === 'idle') {
      const response = deleteCourseFetcher.data as ActionDeleteCourseResponse;
      if (response.hasError) {
        notification.error({
          message: t('course_roadmap:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('course_roadmap:delete_success') });
        navigate('/course-roadmap');
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
        title={t('course_roadmap:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/course-roadmap')}>
            {t('course_roadmap:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('course_roadmap:course_roadmap_with_name', {
            name: loaderData.info?.courseRoadmap.name,
          })}
          onBack={() => navigate('/course-roadmap')}
        />
        <div className="flex-1 mb-4">
          <Detail courseRoadmap={loaderData.info?.courseRoadmap} />
        </div>
        {isCanShow({ accept: [Role.Admin] }) && (
          <Footer
            onDelete={() => setIsOpenModalDeleteCourse(loaderData.info?.courseRoadmap.id ?? false)}
            onEdit={() => navigate(`/course-roadmap/${loaderData.info?.courseRoadmap.id}/edit`)}
          />
        )}
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteCourse}
        onCancel={() => setIsOpenModalDeleteCourse(false)}
        onOk={handleDelete}
        title={t('course_roadmap:delete_title')}
        description={t('course_roadmap:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
