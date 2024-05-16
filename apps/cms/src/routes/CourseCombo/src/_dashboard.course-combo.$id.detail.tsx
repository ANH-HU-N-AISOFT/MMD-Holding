import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeleteCourseResponse,
  action as actionDeleteCourse,
} from './_dashboard.course-combo.$id.delete';
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
import { Detail } from '~/packages/specific/CourseCombo/components/Detail/Detail';
import { CourseCombo } from '~/packages/specific/CourseCombo/models/CourseCombo';
import { getCourseCombo } from '~/packages/specific/CourseCombo/services/getCourseCombo';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';

type LoaderResponse = SimpleResponse<{ courseCombo: CourseCombo }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  if (!params['id']) {
    return redirect('/course-combo', {});
  }
  try {
    const response = await getCourseCombo({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        courseCombo: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['course_combo', 'page404']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteCourseFetcher = useFetcher<typeof actionDeleteCourse>();

  const isDeleting = useMemo(() => {
    return deleteCourseFetcher.state === 'loading' || deleteCourseFetcher.state === 'submitting';
  }, [deleteCourseFetcher]);
  const [isOpenModalDeleteCourse, setIsOpenModalDeleteCourse] = useState<string | false>(false);

  const handleDelete = () => {
    deleteCourseFetcher.submit({}, { method: 'DELETE', action: `/course-combo/${isOpenModalDeleteCourse}/delete` });
  };

  useEffect(() => {
    if (deleteCourseFetcher.data && deleteCourseFetcher.state === 'idle') {
      const response = deleteCourseFetcher.data as ActionDeleteCourseResponse;
      if (response.hasError) {
        notification.error({
          message: t('course_combo:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('course_combo:delete_success') });
        navigate('/course-combo');
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
        title={t('course_combo:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/course-combo')}>
            {t('course_combo:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('course_combo:course_combo_with_name', {
            name: loaderData.info?.courseCombo.name,
          })}
          onBack={() => navigate('/course-combo')}
        />
        <div className="flex-1 mb-4">
          <Detail courseCombo={loaderData.info?.courseCombo} />
        </div>
        {isCanShow({ accept: [Role.Admin] }) && (
          <Footer
            onDelete={() => setIsOpenModalDeleteCourse(loaderData.info?.courseCombo.id ?? false)}
            onEdit={() => navigate(`/course-combo/${loaderData.info?.courseCombo.id}/edit`)}
          />
        )}
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteCourse}
        onCancel={() => setIsOpenModalDeleteCourse(false)}
        onOk={handleDelete}
        title={t('course_combo:delete_title')}
        description={t('course_combo:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
