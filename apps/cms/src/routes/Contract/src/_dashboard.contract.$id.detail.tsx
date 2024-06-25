import { HomeOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Result, notification } from 'reactjs';
import {
  ActionResponse as ActionDeleteContractResponse,
  action as actionDeleteContract,
} from './_dashboard.contract.$id.delete';
import { isCanDeleteContract, isCanEditContract, isCanReadContract } from './utils/Is';
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
} from '~/overrides/remix';
import { SimpleResponse } from '~/packages/base/types/SimpleResponse';
import { Detail } from '~/packages/specific/Contract/components/Detail/Detail';
import { Contract } from '~/packages/specific/Contract/models/Contract';
import { getContract } from '~/packages/specific/Contract/services/getContract';
import { isCanAccessRoute } from '~/packages/specific/Permission/isCan/isCanAccessRoute';
import { isCanShow } from '~/packages/specific/Permission/isCan/isCanShow';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnDetailPage } from '~/utils/functions/preventRevalidateOnDetailPage';

type LoaderResponse = SimpleResponse<{ contract: Contract }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute(isCanReadContract);
  if (!params['id']) {
    return redirect('/contract', {});
  }
  try {
    const response = await getContract({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        contract: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['contract', 'page404']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteContractFetcher = useFetcher<typeof actionDeleteContract>();

  const isDeleting = useMemo(() => {
    return deleteContractFetcher.state === 'loading' || deleteContractFetcher.state === 'submitting';
  }, [deleteContractFetcher]);
  const [isOpenModalDeleteContract, setIsOpenModalDeleteContract] = useState<string | false>(false);

  const handleDelete = () => {
    deleteContractFetcher.submit({}, { method: 'DELETE', action: `/contract/${isOpenModalDeleteContract}/delete` });
  };

  useEffect(() => {
    if (deleteContractFetcher.data && deleteContractFetcher.state === 'idle') {
      const response = deleteContractFetcher.data as ActionDeleteContractResponse;
      if (response.hasError) {
        notification.error({
          message: t('contract:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('contract:delete_success') });
        navigate('/contract');
        setIsOpenModalDeleteContract(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteContractFetcher.state]);
  //#endregion

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('contract:not_found')}
        extra={
          <Button icon={<HomeOutlined />} color="primary" onClick={() => navigate('/contract')}>
            {t('contract:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          title={t('contract:contract_with_name', {
            name: loaderData.info?.contract.studentName,
          })}
          onBack={() => navigate('/contract')}
        />
        <div className="mb-4 flex-1">
          <Detail contract={loaderData.info?.contract} />
        </div>
        <Footer
          onDelete={() => setIsOpenModalDeleteContract(loaderData.info?.contract.id ?? false)}
          onEdit={() => navigate(`/contract/${loaderData.info?.contract.id}/edit`)}
          deletable={isCanShow(isCanDeleteContract)}
          editable={isCanShow(isCanEditContract)}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteContract}
        onCancel={() => setIsOpenModalDeleteContract(false)}
        onOk={handleDelete}
        title={t('contract:delete_title')}
        description={t('contract:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnDetailPage;

export default Page;
