import { ModalProps, Tabs, Tag, notification } from 'antd';
import { nth } from 'ramda';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListingColumnType, TableListing } from '../TableListing';
import { ValidateServiceResponse } from './types/ValidateServiceResponse';
import { Modal } from '~/components/AntCustom/Modal';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

export interface ModalPreviewProps<T extends ValidateServiceResponse> extends Pick<ModalProps, 'open' | 'onCancel'> {
  importType: string;
  validateResponse: T | undefined;
  importService: (
    validRecords: T['items'],
    inValidRecords: Array<T['items'][number] & { messages: string[] }>,
  ) => Promise<void>;
  onImportSuccess: () => void;
  columns: ListingColumnType<T['items'][number]>[];
}

export const ModalPreview = <T extends ValidateServiceResponse>({
  importService,
  onImportSuccess,
  onCancel,
  open,
  importType,
  validateResponse,
  columns,
}: ModalPreviewProps<T>) => {
  const { t } = useTranslation(['components', 'common']);

  const [isImporting, setIsImporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tabActive, setTabActive] = useState<'all' | 'valid' | 'invalid'>('all');

  const validRecords = useMemo(() => {
    return (validateResponse?.items ?? []).reduce<Array<T['items'][number] & { messages: string[] }>>(
      (result, item, index) => {
        const error = validateResponse?.errors.find(error => error.itemIndex === index);
        return result.concat({
          ...item,
          messages: error?.messages,
        });
      },
      [],
    );
  }, [validateResponse]);

  const invalidRecords: T['items'] = useMemo(() => {
    if (!validateResponse?.hasError) {
      return [];
    }
    return (validateResponse?.items ?? []).filter((_, index) => {
      return validateResponse?.errors.find(error => error.itemIndex === index);
    });
  }, [validateResponse]);

  const data = useMemo(() => {
    if (tabActive === 'all') {
      return validateResponse?.items;
    }
    if (tabActive === 'invalid') {
      return invalidRecords;
    }
    if (tabActive === 'valid') {
      return validRecords;
    }
    return validateResponse?.items;
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
      const actionResponse = handleCatchClauseSimpleAtClient(error);
      notification.error({
        message: t('components:ModalPreview.import_error'),
        description: handleGetMessageToToast(t, actionResponse),
      });
    } finally {
      setIsImporting(false);
    }
  };

  const totalRecords = data?.length ?? 0;
  const pageSize = 10;
  return (
    <Modal
      open={open}
      afterOpenChange={() => {
        setCurrentPage(1);
        setTabActive('all');
      }}
      onCancel={handleCancel}
      onOk={handleImport}
      confirmLoading={isImporting}
      title={t('components:ModalPreview.title', { type: importType.toLowerCase() })}
      okText={t('components:ModalPreview.import')}
      width={1600}
    >
      <Tabs
        className={validateResponse?.hasError ? '' : 'hidden'}
        onChange={value => setTabActive(value as typeof tabActive)}
        activeKey={tabActive}
        items={[
          { key: 'all', label: t('components:ModalPreview.all') },
          { key: 'valid', label: t('components:ModalPreview.valid') },
          { key: 'invalid', label: t('components:ModalPreview.invalid') },
        ]}
      />
      <TableListing
        onChange={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
        columns={[
          {
            width: 54,
            align: 'center',
            title: '#',
            render: (_, __, index) => pageSize * (currentPage - 1) + index + 1,
          },
          ...columns,
          {
            width: 140,
            fixed: 'right',
            align: 'center',
            hidden: !validateResponse?.hasError || tabActive === 'valid',
            title: t('components:ModalPreview.status'),
            render: (_, _record, index) => {
              const realIndex = pageSize * (currentPage - 1) + index;
              const hasError = validateResponse?.hasError && nth(realIndex, validateResponse?.errors ?? []);
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
            render: (_, _record, index) => {
              const realIndex = pageSize * (currentPage - 1) + index;
              const error = validateResponse?.errors.find(error => error.itemIndex === realIndex);
              return (
                <ul className="list-disc pl-3">
                  {error?.messages.map((item, index) => {
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
        dataSource={data}
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
    </Modal>
  );
};
