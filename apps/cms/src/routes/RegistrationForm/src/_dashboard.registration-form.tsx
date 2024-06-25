import i18next from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notification } from 'reactjs';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utilities';
import {
  ActionResponse as ActionDeleteRegistrationFormResponse,
  action as actionDeleteRegistrationForm,
} from './_dashboard.registration-form.$id.delete';
import {
  isCanCreateRegistrationForm,
  isCanDeleteRegistrationForm,
  isCanEditRegistrationForm,
  isCanExportRegistrationForm,
  isCanImportRegistrationForm,
  isCanReadRegistrationForm,
} from './utils/Is';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData, useNavigate } from '~/overrides/@remix';
import { useListingData } from '~/packages/base/hooks/useListingData';
import { SimpleListingLoaderResponse } from '~/packages/base/types/SimpleListingLoaderResponse';
import { FormSearchNFilter } from '~/packages/specific/RegistrationForm/components/Listing/FormSearchNFilter';
import { Header } from '~/packages/specific/RegistrationForm/components/Listing/Header';
import { Table } from '~/packages/specific/RegistrationForm/components/Listing/Table';
import { RegistrationForm } from '~/packages/specific/RegistrationForm/models/RegistrationForm';
import { getRegistrationForms } from '~/packages/specific/RegistrationForm/services/getRegistrationForms';
import { ListingSearchParams } from '~/packages/specific/RegistrationForm/types/ListingSearchParams';
import { lisitngUrlSearchParamsUtils } from '~/packages/specific/RegistrationForm/utils/lisitngUrlSearchParamsUtils';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { isCanAccessRoute } from '~/utils/functions/isCan/isCanAccessRoute';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<TypedResponse<SimpleListingLoaderResponse<RegistrationForm>>> => {
  await isCanAccessRoute(isCanReadRegistrationForm);
  const t = i18next.t;
  const { search, page = 1, courseIds, createdAt } = lisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getRegistrationForms({
      page,
      query: search,
      courseIds,
      createdAt,
    });

    return json({
      info: {
        hits: response.items,
        pagination: {
          totalPages: response.headers['x-pages-count'],
          totalRecords: response.headers['x-total-count'],
          pageSize: response.headers['x-per-page'],
        },
      },
      page: Math.min(page, response.headers['x-pages-count'] || 1),
    });
  } catch (error) {
    return json({
      page,
      info: {
        hits: [],
        pagination: { pageSize: 0, totalPages: 1, totalRecords: 0 },
      },
      toastMessage: handleGetMessageToToast(t, await handleCatchClauseSimpleAtClient(error)),
    });
  }
};

export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['registration_form']);

  //#region Listing
  const paramsInUrl = lisitngUrlSearchParamsUtils.decrypt(lisitngUrlSearchParamsUtils.getUrlSearchParams().toString());
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ListingSearchParams) => {
    const searchParamsToLoader = lisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/registration-form' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<RegistrationForm, ListingSearchParams>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
    urlSearchParamsUtils: lisitngUrlSearchParamsUtils,
  });
  //#endregion

  //#region Delete
  const deleteRegistrationFormFetcher = useFetcher<typeof actionDeleteRegistrationForm>();

  const isDeleting = useMemo(() => {
    return deleteRegistrationFormFetcher.state === 'loading' || deleteRegistrationFormFetcher.state === 'submitting';
  }, [deleteRegistrationFormFetcher]);
  const [isOpenModalDeleteRegistrationForm, setIsOpenModalDeleteRegistrationForm] = useState<string | false>(false);

  const handleDelete = () => {
    deleteRegistrationFormFetcher.submit(
      {},
      { method: 'DELETE', action: `/registration-form/${isOpenModalDeleteRegistrationForm}/delete` },
    );
  };

  useEffect(() => {
    if (deleteRegistrationFormFetcher.data && deleteRegistrationFormFetcher.state === 'idle') {
      const response = deleteRegistrationFormFetcher.data as ActionDeleteRegistrationFormResponse;
      if (response.hasError) {
        notification.error({
          message: t('registration_form:delete_failure'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('registration_form:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteRegistrationForm(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteRegistrationFormFetcher.state]);
  //#endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <Header
          creatable={isCanShow(isCanCreateRegistrationForm)}
          importable={isCanShow(isCanImportRegistrationForm)}
          exportable={isCanShow(isCanExportRegistrationForm)}
          isExporting={false}
          onExport={() => notification.info({ message: 'Chức năng đang phát triển' })}
          onCreate={() => navigate('/registration-form/create')}
          onImport={() => notification.info({ message: 'Chức năng đang phát triển' })}
        />
        <FormSearchNFilter
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{
            createdAt: paramsInUrl.createdAt,
            courseIds: paramsInUrl.courseIds,
          }}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => {
            handleRequest({
              page: 1,
              createdAt: undefined,
              courseIds: undefined,
            });
          }}
          onSearch={value => handleRequest({ page: 1, search: value })}
        />
        <Table
          deletable={isCanShow(isCanDeleteRegistrationForm)}
          editable={isCanShow(isCanEditRegistrationForm)}
          loading={isFetchingList}
          currentPage={data.page}
          pageSize={data.info.pagination.pageSize}
          totalRecords={data.info.pagination.totalRecords}
          dataSource={data.info.hits}
          onChange={page => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteRegistrationForm(data)}
          onEdit={record => navigate(`/registration-form/${record.id}/edit`)}
          onView={record => navigate(`/registration-form/${record.id}/detail`)}
        />
      </div>
      <ModalConfirmDelete
        open={!!isOpenModalDeleteRegistrationForm}
        onCancel={() => setIsOpenModalDeleteRegistrationForm(false)}
        onOk={handleDelete}
        title={t('registration_form:delete_title')}
        description={t('registration_form:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
