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
  isCanAccessRoute({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] });
  const t = i18next.t;
  try {
    const { errors, data } = await getValidatedFormData<FormValues>(
      request,
      getFormMutationResolver({ t: t as TFunction<any>, needPassword: true }),
    );
    if (data) {
      await createStudent({
        accessStatus: data.roleSystem.accessStatus,
        address: data.personalInformation.currentAddress ?? undefined,
        birthday: data.personalInformation.dateOfBirth ?? undefined,
        districtId: data.personalInformation.district ?? undefined,
        email: data.personalInformation.email ?? undefined,
        fullName: data.personalInformation.fullName,
        gender: data.personalInformation.gender ?? undefined,
        notifyParentsOfResults: data.personalInformation.notifyResultToParent ?? undefined,
        organizationIds: data.personalInformation.departments,
        parentPhoneNumber: data.personalInformation.parentPhone ?? undefined,
        password: data.roleSystem.password as string,
        phoneNumber: data.personalInformation.phone,
        schoolId: data.personalInformation.school ?? undefined,
        source: data.personalInformation.source ?? undefined,
        supporterIds: data.personalInformation.saleEmployees ?? undefined,
        username: data.roleSystem.username,
        provinceId: data.personalInformation.city ?? undefined,
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
  isCanAccessRoute({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] });
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
      <div className="flex-1 mb-4">
        <FormMutation
          defaultValues={{
            personalInformation: {
              notifyResultToParent: false,
              departments: getSession()?.profile?.organizationId ? [getSession()?.profile?.organizationId] : [],
            },
            roleSystem: {
              accessStatus: EmployeeAccessStatus.GRANTED,
              password: 'Abc@123456',
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
