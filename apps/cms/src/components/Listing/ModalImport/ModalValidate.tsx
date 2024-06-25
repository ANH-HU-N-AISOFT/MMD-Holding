import { FileExcelOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ModalProps, Typography, AntRawUpload, notification } from 'reactjs';
import { ValidateServiceResponse } from './types/ValidateServiceResponse';
import { Modal } from '~/components/AntCustom/Modal';

export interface ModalValidateProps<T extends ValidateServiceResponse> extends Pick<ModalProps, 'open' | 'onCancel'> {
  importType: string;
  downSampleUrl: string;
  validateService: (file: File) => Promise<T>;
  onValidateSuccess: (response: T) => void;
}

export const ModalValidate = <T extends ValidateServiceResponse>({
  importType,
  downSampleUrl,
  validateService,
  onValidateSuccess,
  onCancel,
  open,
}: ModalValidateProps<T>) => {
  const { t } = useTranslation(['components']);

  const [fileState, setFileState] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const renderDragger = () => {
    if (fileState) {
      return (
        <div className="flex h-[68px] overflow-hidden rounded-lg border border-solid border-neutral-300">
          <div className="flex w-[68px] shrink-0 items-center justify-center bg-neutral-100">
            <FileExcelOutlined className="text-base" />
          </div>
          <div className="flex flex-auto items-center justify-between gap-2 px-4">
            <div className="text-sm font-semibold">{fileState.name}</div>
            <AntRawUpload
              beforeUpload={() => {
                return false;
              }}
              onChange={info => {
                const file = info?.file as RcFile | undefined;
                setFileState(file ?? null);
              }}
              showUploadList={false}
              accept=".xls, .xlsx"
            >
              <Button>{t('components:ModalValidate.replace_file')}</Button>
            </AntRawUpload>
          </div>
        </div>
      );
    }
    return (
      <Dragger
        beforeUpload={() => {
          return false;
        }}
        onChange={info => {
          const file = info?.file as RcFile | undefined;
          setFileState(file ?? null);
        }}
        showUploadList={false}
        accept=".csv, .xls, .xlsx"
        className="block h-[120px]"
      >
        <div className="flex items-center justify-center">
          <Button>{t('components:ModalValidate.add_file')}</Button>
        </div>
      </Dragger>
    );
  };

  const handleValidate = async () => {
    if (fileState) {
      try {
        setIsValidating(true);
        const response = await validateService(fileState);
        onValidateSuccess(response);
        setFileState(null);
      } catch {
        notification.error({
          message: t('components:ModalValidate.error_title'),
          description: t('components:ModalValidate.error_description'),
        });
      } finally {
        setIsValidating(false);
      }
    }
  };

  const handleCancel: ModalProps['onCancel'] = event => {
    onCancel?.(event);
  };

  return (
    <Modal
      open={open}
      afterClose={() => setFileState(null)}
      onCancel={handleCancel}
      onOk={handleValidate}
      confirmLoading={isValidating}
      okButtonProps={{ disabled: !fileState }}
      title={t('components:ModalValidate.title', { type: importType.toLowerCase() })}
      okText={t('components:ModalValidate.upload_and_preview')}
      footer={(_, { OkBtn, CancelBtn }) => (
        <div className="flex items-center justify-between">
          <Typography.Link href={downSampleUrl} download target="_blank" className="!underline">
            {t('components:ModalValidate.download_sample')}
          </Typography.Link>
          <div className="flex items-center gap-2">
            <CancelBtn />
            <OkBtn />
          </div>
        </div>
      )}
    >
      {renderDragger()}
    </Modal>
  );
};
