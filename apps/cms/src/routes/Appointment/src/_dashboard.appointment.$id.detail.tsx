import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeleteAppointmentResponse,
  action as actionDeleteAppointment,
} from './_dashboard.appointment.$id.delete';
import { isCanDeleteAppointment, isCanEditAppointment, isCanReadAppointment } from './utils/Is';
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
import { Detail } from '~/packages/specific/Appointment/components/Detail/Detail';
import { Appointment } from '~/packages/specific/Appointment/models/Appointment';
import { getAppointment } from '~/packages/specific/Appointment/services/getAppointment';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';

type LoaderResponse = SimpleResponse<{ appointment: Appointment }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanReadAppointment);
  if (!params['id']) {
    return redirect('/appointment', {});
  }
  try {
    const response = await getAppointment({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        appointment: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['appointment', 'page404']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteAppointmentFetcher = useFetcher<typeof actionDeleteAppointment>();

  const isDeleting = useMemo(() => {
    return deleteAppointmentFetcher.state === 'loading' || deleteAppointmentFetcher.state === 'submitting';
  }, [deleteAppointmentFetcher]);
  const [isOpenModalDeleteAppointment, setIsOpenModalDeleteAppointment] = useState<string | false>(false);

  const handleDelete = () => {
    deleteAppointmentFetcher.submit(
      {},
      { method: 'DELETE', action: `/appointment/${isOpenModalDeleteAppointment}/delete` },
    );
  };

  useEffect(() => {
    if (deleteAppointmentFetcher.data && deleteAppointmentFetcher.state === 'idle') {
      const response = deleteAppointmentFetcher.data as ActionDeleteAppointmentResponse;
      if (response.hasError) {
        notification.error({
          message: t('appointment:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('appointment:delete_success') });
        navigate('/appointment');
        setIsOpenModalDeleteAppointment(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteAppointmentFetcher.state]);
  //#endregion

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('appointment:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/appointment')}>
            {t('appointment:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('appointment:appointment_with_student_name', {
            name: loaderData.info?.appointment.student?.fullName,
          })}
          onBack={() => navigate('/appointment')}
        />
        <div className="flex-1 mb-4">
          <Detail appointment={loaderData.info?.appointment} />
        </div>
        <Footer
          onDelete={() => setIsOpenModalDeleteAppointment(loaderData.info?.appointment.id ?? false)}
          onEdit={() => navigate(`/appointment/${loaderData.info?.appointment.id}/edit`)}
          deletable={isCanShow(isCanDeleteAppointment)}
          editable={isCanShow(isCanEditAppointment)}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteAppointment}
        onCancel={() => setIsOpenModalDeleteAppointment(false)}
        onOk={handleDelete}
        title={t('appointment:delete_title')}
        description={t('appointment:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
