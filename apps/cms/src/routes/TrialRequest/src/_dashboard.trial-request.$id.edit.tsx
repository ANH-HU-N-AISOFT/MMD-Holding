import { HomeOutlined } from '@ant-design/icons';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Result, notification } from 'reactjs';
import { getDefaultListingTrialRequestsUrl } from '../constants/getDefaultFilterUrl';
import { isCanEditTrialRequest } from './utils/Is';
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
} from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { Edit } from '~/packages/specific/TrialRequest/components/Edit/Edit';
import { FormValues } from '~/packages/specific/TrialRequest/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/TrialRequest/components/FormMutation/zodResolver';
import { TrialRequest } from '~/packages/specific/TrialRequest/models/TrialRequest';
import { getTrialRequest } from '~/packages/specific/TrialRequest/services/getTrialRequest';
import { updateTrialRequest } from '~/packages/specific/TrialRequest/services/updateTrialRequest';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type ActionResponse = SimpleResponse<undefined, undefined>;
export const action = async ({ request, params }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  await isCanAccessRoute(isCanEditTrialRequest);
  if (!params['id']) {
    return redirect(getDefaultListingTrialRequestsUrl(), {});
  }
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver(t as TFunction<any>),
    );
    if (data) {
      await updateTrialRequest({
        id: params['id'],
        data: {
          id: params['id'],
          demoType: data.classType,
          consultantId: data.consultantId,
          courseRoadmapId: data.courseRoadmapId,
          studyDate: data.learningDate,
          learningOrganizationId: data.learningOrganizationId,
          studyTime: data.learningTime,
          studyMode: data.studyMode,
          notes: data.notes,
          status: data.status,
          studentId: data.studentId,
          adminId: data.adminId,
          lecturerId: data.lectureId,
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

type LoaderResponse = SimpleResponse<{ trialRequest: TrialRequest }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanEditTrialRequest);
  if (!params['id']) {
    return redirect(getDefaultListingTrialRequestsUrl(), {});
  }
  try {
    const response = await getTrialRequest({ id: params['id'] });
    return json({
      info: {
        trialRequest: response,
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
  const { t } = useTranslation(['trial_request']);

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
          message: t('trial_request:update_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('trial_request:update_success') });
        navigate(getDefaultListingTrialRequestsUrl());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('trial_request:not_found')}
        extra={
          <Button icon={<HomeOutlined />} color="primary" onClick={() => navigate(getDefaultListingTrialRequestsUrl())}>
            {t('trial_request:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <Header
        title={t('trial_request:trial_with_student_name', { name: loaderData.info.trialRequest.student?.fullName })}
        onBack={() => navigate(getDefaultListingTrialRequestsUrl())}
      />
      <div className="mb-4 flex-1">
        <Edit isSubmiting={isSubmiting} uid={FormUpdate} trialRequest={loaderData.info?.trialRequest} />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormUpdate, htmlType: 'submit' }}
        onCancel={() => navigate(getDefaultListingTrialRequestsUrl())}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnEditPage;

export default Page;
