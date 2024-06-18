import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeleteContractTemplateResponse,
  action as actionDeleteContractTemplate,
} from './_dashboard.contract-template.$id.delete';
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
import { Detail } from '~/packages/specific/ContractTemplate/components/Detail/Detail';
import { ContractTemplate } from '~/packages/specific/ContractTemplate/models/ContractTemplate';
import { getContractTemplate } from '~/packages/specific/ContractTemplate/services/getContractTemplate';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';

type LoaderResponse = SimpleResponse<{ contractTemplate: ContractTemplate }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute({ accept: [Role.SuperAdmin], not: [Role.SuperAdmin] });
  if (!params['id']) {
    return redirect('/contract-template', {});
  }
  try {
    const response = await getContractTemplate({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        contractTemplate: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['contract_template', 'page404']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteContractTemplateFetcher = useFetcher<typeof actionDeleteContractTemplate>();

  const isDeleting = useMemo(() => {
    return deleteContractTemplateFetcher.state === 'loading' || deleteContractTemplateFetcher.state === 'submitting';
  }, [deleteContractTemplateFetcher]);
  const [isOpenModalDeleteContractTemplate, setIsOpenModalDeleteContractTemplate] = useState<string | false>(false);

  const handleDelete = () => {
    deleteContractTemplateFetcher.submit(
      {},
      { method: 'DELETE', action: `/contract-template/${isOpenModalDeleteContractTemplate}/delete` },
    );
  };

  useEffect(() => {
    if (deleteContractTemplateFetcher.data && deleteContractTemplateFetcher.state === 'idle') {
      const response = deleteContractTemplateFetcher.data as ActionDeleteContractTemplateResponse;
      if (response.hasError) {
        notification.error({
          message: t('contract_template:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('contract_template:delete_success') });
        navigate('/contract-template');
        setIsOpenModalDeleteContractTemplate(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteContractTemplateFetcher.state]);
  //#endregion

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('contract_template:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/contract-template')}>
            {t('contract_template:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('contract_template:contract_template_with_name', {
            name: loaderData.info?.contractTemplate.name,
          })}
          onBack={() => navigate('/contract-template')}
        />
        <div className="flex-1 mb-4">
          <Detail contractTemplate={loaderData.info?.contractTemplate} />
        </div>
        {isCanShow({ accept: [Role.SuperAdmin] }) && (
          <Footer
            onDelete={() => setIsOpenModalDeleteContractTemplate(loaderData.info?.contractTemplate.id ?? false)}
            onEdit={() => navigate(`/contract-template/${loaderData.info?.contractTemplate.id}/edit`)}
          />
        )}
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteContractTemplate}
        onCancel={() => setIsOpenModalDeleteContractTemplate(false)}
        onOk={handleDelete}
        title={t('contract_template:delete_title')}
        description={t('contract_template:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
