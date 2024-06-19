import { HomeOutlined } from '@ant-design/icons';
import { Button, Result, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionResponse as ActionDeleteDocumentTemplateResponse,
  action as actionDeleteDocumentTemplate,
} from './_dashboard.document-template.$id.delete';
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
import { Detail } from '~/packages/specific/DocumentTemplate/components/Detail/Detail';
import { DocumentTemplate } from '~/packages/specific/DocumentTemplate/models/DocumentTemplate';
import { getDocumentTemplate } from '~/packages/specific/DocumentTemplate/services/getDocumentTemplate';
import { handleCatchClauseSimple } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';

type LoaderResponse = SimpleResponse<{ documentTemplate: DocumentTemplate }, undefined>;
export const loader = async ({ params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  await isCanAccessRoute({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Lecturer, Role.Sale] });
  if (!params['id']) {
    return redirect('/document-template', {});
  }
  try {
    const response = await getDocumentTemplate({ id: params['id'] });
    return json({
      hasError: false,
      message: '',
      info: {
        documentTemplate: response,
      },
    });
  } catch (error) {
    return handleCatchClauseSimple(error);
  }
};

export const Page = () => {
  const { t } = useTranslation(['document_template', 'page404']);
  const navigate = useNavigate();

  const loaderData = useLoaderData<typeof loader>();

  //#region Delete
  const deleteDocumentTemplateFetcher = useFetcher<typeof actionDeleteDocumentTemplate>();

  const isDeleting = useMemo(() => {
    return deleteDocumentTemplateFetcher.state === 'loading' || deleteDocumentTemplateFetcher.state === 'submitting';
  }, [deleteDocumentTemplateFetcher]);
  const [isOpenModalDeleteDocumentTemplate, setIsOpenModalDeleteDocumentTemplate] = useState<string | false>(false);

  const handleDelete = () => {
    deleteDocumentTemplateFetcher.submit(
      {},
      { method: 'DELETE', action: `/document-template/${isOpenModalDeleteDocumentTemplate}/delete` },
    );
  };

  useEffect(() => {
    if (deleteDocumentTemplateFetcher.data && deleteDocumentTemplateFetcher.state === 'idle') {
      const response = deleteDocumentTemplateFetcher.data as ActionDeleteDocumentTemplateResponse;
      if (response.hasError) {
        notification.error({
          message: t('document_template:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('document_template:delete_success') });
        navigate('/document-template');
        setIsOpenModalDeleteDocumentTemplate(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteDocumentTemplateFetcher.state]);
  //#endregion

  if (!loaderData.info) {
    return (
      <Result
        status="404"
        title={t('document_template:not_found')}
        extra={
          <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate('/document-template')}>
            {t('document_template:back_to_list')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <Header
          title={t('document_template:document_template_with_name', {
            name: loaderData.info?.documentTemplate.name,
          })}
          onBack={() => navigate('/document-template')}
        />
        <div className="flex-1 mb-4">
          <Detail documentTemplate={loaderData.info?.documentTemplate} />
        </div>
        {isCanShow({ accept: [Role.SuperAdmin] }) && (
          <Footer
            onDelete={() => setIsOpenModalDeleteDocumentTemplate(loaderData.info?.documentTemplate.id ?? false)}
            onEdit={() => navigate(`/document-template/${loaderData.info?.documentTemplate.id}/edit`)}
          />
        )}
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteDocumentTemplate}
        onCancel={() => setIsOpenModalDeleteDocumentTemplate(false)}
        onOk={handleDelete}
        title={t('document_template:delete_title')}
        description={t('document_template:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
