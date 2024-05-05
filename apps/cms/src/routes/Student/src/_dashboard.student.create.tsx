import { notification } from 'antd';
import i18next, { TFunction } from 'i18next';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from '~/components/Mutation/Footer';
import { Header } from '~/components/Mutation/Header';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { ActionFunctionArgs, TypedResponse, json, useActionData, useNavigate, useNavigation } from '~/overrides/@remix';
import { getValidatedFormData } from '~/overrides/@remix-hook-form';
import { SimpleResponse } from '~/packages/@base/types/SimpleResponse';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { EmployeeAccessStatus } from '~/packages/common/SelectVariants/EmployeeAccessStatus/constants/EmployeeAccessStatus';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { FormMutation, FormValues } from '~/packages/specific/Student/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/specific/Student/components/FormMutation/zodResolver';
import { createStudent } from '~/packages/specific/Student/services/createStudent';
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
      getFormMutationResolver({ t: t as TFunction<any>, needPassword: true }),
    );
    if (data) {
      await createStudent({
        accessStatus: data.roleSystem.accessStatus,
        address: data.personalInformation.currentAddress,
        birthday: data.personalInformation.dateOfBirth,
        districtId: data.personalInformation.district,
        email: data.personalInformation.email,
        fullName: data.personalInformation.fullName,
        gender: data.personalInformation.gender,
        notifyParentsOfResults: data.personalInformation.notifyResultToParent,
        organizationIds: data.personalInformation.departments,
        parentPhone: data.personalInformation.parentPhone,
        password: data.roleSystem.password,
        phoneNumber: data.personalInformation.phone,
        schoolId: data.personalInformation.school,
        source: data.personalInformation.source,
        supporterIds: data.personalInformation.saleEmployees,
        username: data.roleSystem.username,
        provinceId: data.personalInformation.city,
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

export const loader = () => {
  isCanAccessRoute({ accept: [Role.Admin] });
  return null;
};

const FormCreateUid = 'FORM_CREATE';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['student']);

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('student:create_failure'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        notification.success({ message: t('student:create_success') });
        navigate('/student');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);
  return (
    <div className="flex flex-col h-full">
      <Header title={t('student:add_student')} onBack={() => navigate('/student')} />
      <div className="flex-1">
        <FormMutation
          defaultValues={{
            personalInformation: {
              notifyResultToParent: false,
              departments: getSession()?.profile?.organizationId ? [getSession()?.profile?.organizationId] : [],
            },
            roleSystem: {
              accessStatus: EmployeeAccessStatus.GRANTED,
            },
          }}
          isSubmiting={isSubmiting}
          uid={FormCreateUid}
        />
      </div>
      <Footer
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onCancel={() => navigate('/student')}
      />
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
