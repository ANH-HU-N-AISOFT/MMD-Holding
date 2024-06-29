import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ModalProps, Tabs, Tag } from 'reactjs';
import { notification } from 'reactjs';
import { ListingColumnType, TableListing } from '../TableListing';
import { ValidateServiceResponse } from './types/ValidateServiceResponse';
import { ModalWithI18n } from '~/components/ModalWithI18n/ModalWithI18n';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

export interface ModalPreviewProps<T extends ValidateServiceResponse> extends Pick<ModalProps, 'open' | 'onCancel'> {
  importType: string;
  validateResponse: T | undefined;
  importService: (validRecords: ValidNRawRecord<T>[], inValidRecords: InvalidRecord<T>[]) => Promise<void>;
  onImportSuccess: () => void;
  columns: ListingColumnType<T['items'][number]>[];
  onUploadNew: () => void;
}

type InvalidRecord<T extends ValidateServiceResponse> = T['items'][number] & {
  messages: string[];
};
type ValidNRawRecord<T extends ValidateServiceResponse> = T['items'][number];
export const ModalPreview = <T extends ValidateServiceResponse>({
  importService,
  onImportSuccess,
  onCancel,
  onUploadNew,
  open,
  importType,
  validateResponse,
  columns,
}: ModalPreviewProps<T>) => {
  const { t } = useTranslation(['components', 'common']);

  const [isImporting, setIsImporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tabActive, setTabActive] = useState<'all' | 'valid' | 'invalid'>('all');

  const validRecords: ValidNRawRecord<T>[] = useMemo(() => {
    return (validateResponse?.items ?? []).filter((_, index) => {
      return !validateResponse?.errors.find(error => error.itemIndex === index)?.messages.length;
    });
  }, [validateResponse]);

  const invalidRecords: InvalidRecord<T>[] = useMemo(() => {
    if (!validateResponse?.hasError) {
      return [];
    }

    return (validateResponse?.items ?? []).reduce<InvalidRecord<T>[]>((result, item, index) => {
      const error = validateResponse?.errors.find(error => error.itemIndex === index);
      if (error?.messages.length) {
        return result.concat({
          ...item,
          messages: error.messages,
        } as InvalidRecord<T>);
      }
      return result;
    }, []);
  }, [validateResponse]);

  const data: InvalidRecord<T>[] | ValidNRawRecord<T>[] = useMemo(() => {
    if (tabActive === 'all') {
      return validateResponse?.items ?? [];
    }
    if (tabActive === 'invalid') {
      return invalidRecords;
    }
    if (tabActive === 'valid') {
      return validRecords;
    }
    return validateResponse?.items ?? [];
  }, [validateResponse, validRecords, invalidRecords, tabActive]);

  const handleCancel: ModalProps['onCancel'] = event => {
    onCancel?.(event);
  };

  const handleImport = async () => {
    setIsImporting(true);
    try {
      await importService?.(validRecords, invalidRecords);
      onImportSuccess?.();
      notification.success({
        message: t('components:ModalPreview.import_success'),
      });
      // if (!isEmpty(invalidRecords)) {
      //   notification.warning({
      //     message: t('components:ModalPreview.warning_invaid_records_title'),
      //     description: <Typography.Link>{t('components:ModalPreview.view_detail')}</Typography.Link>,
      //   });
      // }
    } catch (error) {
      const actionResponse = await handleCatchClauseSimpleAtClient(error);
      notification.error({
        message: t('components:ModalPreview.import_error'),
        description: handleGetMessageToToast(t, actionResponse),
      });
    } finally {
      setIsImporting(false);
    }
  };

  const totalRecords = data?.length ?? 0;
  const pageSize = 20;
  return (
    <ModalWithI18n
      open={open}
      afterClose={() => {
        setCurrentPage(1);
        setTabActive('all');
      }}
      onCancel={handleCancel}
      confirmLoading={isImporting}
      title={t('components:ModalPreview.title', { type: importType.toLowerCase() })}
      width={1600}
      footer={() => {
        return (
          <div className="flex items-center justify-end gap-2">
            <Button onClick={onCancel}>{t('components:Modal.cancel')}</Button>
            <Button className={!invalidRecords.length ? 'hidden' : ''} onClick={onUploadNew}>
              {t('components:ModalPreview.upload_new')}
            </Button>
            <Button loading={isImporting} color="primary" onClick={handleImport}>
              {invalidRecords.length
                ? t('components:ModalPreview.import_and_skip_error_records')
                : t('components:ModalPreview.import_records')}
            </Button>
          </div>
        );
      }}
    >
      <Tabs
        className={validateResponse?.hasError ? '' : 'hidden'}
        onChange={value => setTabActive(value as typeof tabActive)}
        tabActive={tabActive}
        tabs={[
          {
            key: 'all',
            label: (
              <div>
                {t('components:ModalPreview.all')} ({validateResponse?.items?.length ?? 0})
              </div>
            ),
          },
          {
            key: 'valid',
            label: (
              <div>
                {t('components:ModalPreview.valid')} ({validRecords.length ?? 0})
              </div>
            ),
          },
          {
            key: 'invalid',
            label: (
              <div>
                {t('components:ModalPreview.invalid')} ({invalidRecords.length ?? 0})
              </div>
            ),
          },
        ]}
      />
      <TableListing
        onChange={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
        dataSource={data}
        columns={[
          {
            width: 54,
            align: 'center',
            title: '#',
            render: (_, __, index) => pageSize * (currentPage - 1) + index + 1,
          },
          ...(columns as any),
          {
            width: 140,
            fixed: 'right',
            align: 'center',
            hidden: !validateResponse?.hasError || tabActive === 'valid',
            title: t('components:ModalPreview.status'),
            render: (_, record, index) => {
              let hasError = false;
              if (tabActive === 'all') {
                const realIndex = pageSize * (currentPage - 1) + index;
                hasError = !!validateResponse?.errors.find(error => error.itemIndex === realIndex)?.messages.length;
              } else {
                const record_ = record as InvalidRecord<T>;
                hasError = !!record_.messages.length;
              }
              if (hasError) {
                return <Tag color="error">{t('components:ModalPreview.invalid')}</Tag>;
              }
              return <Tag color="success">{t('components:ModalPreview.valid')}</Tag>;
            },
          },
          {
            width: 240,
            fixed: 'right',
            hidden: !validateResponse?.hasError || tabActive === 'valid',
            title: t('components:ModalPreview.message'),
            render: (_, record, index) => {
              let messages: string[] = [];
              if (tabActive === 'all') {
                const realIndex = pageSize * (currentPage - 1) + index;
                messages = validateResponse?.errors.find(error => error.itemIndex === realIndex)?.messages ?? [];
              } else {
                const record_ = record as InvalidRecord<T>;
                messages = record_.messages ?? [];
              }
              return (
                <ul className="list-disc pl-3">
                  {messages.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                  {/* <Collapsed
                    className="-ml-3 pt-2"
                    disabled={!error?.messages || error?.messages?.length <= 3}
                    LessState={error?.messages?.slice(0, 3)?.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                    MoreState={error?.messages?.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  /> */}
                </ul>
              );
            },
          },
        ]}
        plural={({ from, to }) => {
          return t('common:showing_range_results', {
            from,
            to,
            total: totalRecords,
          });
        }}
        singular={({ from, to }) => {
          return t('common:showing_range_result', {
            from,
            to,
            total: totalRecords,
          });
        }}
        totalRecords={totalRecords}
        paginationMode="none"
      />
    </ModalWithI18n>
  );
};
