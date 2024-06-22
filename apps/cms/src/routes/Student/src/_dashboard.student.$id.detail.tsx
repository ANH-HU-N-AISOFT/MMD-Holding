import { ExperimentOutlined, HomeOutlined, QuestionCircleOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeleteStudentResponse,
  action as actionDeleteStudent,
} from './_dashboard.student.$id.delete';
import { isCanDeleteStudent, isCanEditStudent, isCanReadStudent } from './utils/Is';
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
import { createUrlSearchParamsUtils as createAppointmentUrlSearchParamsUtils } from '~/packages/specific/Appointment/utils/createUrlSearchParamsUtils';
import { createUrlSearchParamsUtils as createConsultantFormUrlSearchParamsUtils } from '~/packages/specific/ConsultantForm/utils/createUrlSearchParamsUtils';
import { Detail } from '~/packages/specific/Student/components/Detail/Detail';
import { Student } from '~/packages/specific/Student/models/Student';
import { getStudent } from '~/packages/specific/Student/services/getStudent';
import { createUrlSearchParamsUtils as createTrialUrlSearchParamsUtils } from '~/packages/specific/TrialRequest/utils/createUrlSearchParamsUtils';
import { isCanCreateAppointment } from '~/routes/Appointment/src/utils/Is';
import { isCanCreateConsultantForm } from '~/routes/ConsultantForm/src/utils/Is';
import { isCanCreateTrialRequest } from '~/routes/TrialRequest/src/utils/Is';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnDetailPage } from '~/utils/functions/preventRevalidateOnDetailPage';

type LoaderResponse = SimpleResponse<{ student: Student }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanReadStudent);
  if (!params['id']) {
    return redirect('/student', {});
  }
  try {
    const response = await getStudent({ id: params['id'] });
    return json({
      hasError: false,
      info: {
        student: response,
      },
      message: '',
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['student']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteStudentFetcher = useFetcher<typeof actionDeleteStudent>();

  const isDeleting = useMemo(() => {
    return deleteStudentFetcher.state === 'loading' || deleteStudentFetcher.state === 'submitting';
  }, [deleteStudentFetcher]);
  const [isOpenModalDeleteStudent, setIsOpenModalDeleteStudent] = useState<string | false>(false);

  const handleDelete = () => {
    deleteStudentFetcher.submit({}, { method: 'DELETE', action: `/student/${isOpenModalDeleteStudent}/delete` });
  };

  useEffect(() => {
    if (deleteStudentFetcher.data && deleteStudentFetcher.state === 'idle') {
      const response = deleteStudentFetcher.data as ActionDeleteStudentResponse;
      if (response.hasError) {
        notification.error({
          message: t('student:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('student:delete_success') });
        navigate('/student');
        setIsOpenModalDeleteStudent(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteStudentFetcher.state]);
  //#endregion

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('student:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/student')}>
            {t('student:back_to_list')}
          </Button>
        }
      />
    );
  }
  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('student:student_with_name_n_code', {
            name: loaderData.info?.student.fullName,
            code: loaderData.info?.student?.code,
          })}
          onBack={() => navigate('/student')}
        />
        <div className="flex-1 mb-4">
          <Detail student={loaderData.info?.student} />
        </div>
        <Footer
          onDelete={() => setIsOpenModalDeleteStudent(loaderData.info?.student.id ?? false)}
          onEdit={() => navigate(`/student/${loaderData.info?.student.id}/edit`)}
          deletable={isCanShow(isCanDeleteStudent)}
          editable={isCanShow(isCanEditStudent)}
          moreActions={[
            {
              key: '1',
              icon: <ScheduleOutlined />,
              label: t('student:book_appointment'),
              hidden: !isCanShow(isCanCreateAppointment),
              onClick: () => {
                const createSearchParams = createAppointmentUrlSearchParamsUtils.encrypt({
                  studentId: loaderData.info?.student.id,
                });
                navigate(`/appointment/create${createSearchParams}`);
              },
            },
            {
              key: '2',
              icon: <QuestionCircleOutlined />,
              label: t('student:create_consultant'),
              hidden: !isCanShow(isCanCreateConsultantForm),
              onClick: () => {
                const createSearchParams = createConsultantFormUrlSearchParamsUtils.encrypt({
                  studentId: loaderData.info?.student.id,
                });
                navigate(`/consultant-form/create${createSearchParams}`);
              },
            },
            {
              key: '3',
              icon: <ExperimentOutlined />,
              label: t('student:create_trial'),
              hidden: !isCanShow(isCanCreateTrialRequest),
              onClick: () => {
                const createSearchParams = createTrialUrlSearchParamsUtils.encrypt({
                  studentId: loaderData.info?.student.id,
                });
                navigate(`/trial-request/create${createSearchParams}`);
              },
            },
          ]}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteStudent}
        onCancel={() => setIsOpenModalDeleteStudent(false)}
        onOk={handleDelete}
        title={t('student:delete_title')}
        description={t('student:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnDetailPage;

export default Page;
