import { FileExcelOutlined } from '@ant-design/icons';
import { Button, ModalProps, Typography, Upload, notification } from 'antd';
import { RcFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
        <div className="border border-solid border-neutral-300 h-[68px] rounded-lg flex overflow-hidden">
          <div className="w-[68px] flex-shrink-0 bg-neutral-100 flex items-center justify-center">
            <FileExcelOutlined className="text-base" />
          </div>
          <div className="flex flex-auto items-center justify-between gap-2 px-4">
            <div className="font-semibold text-sm">{fileState.name}</div>
            <Upload
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
            </Upload>
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
        accept=".xls, .xlsx"
        className="block h-[120px]"
      >
        <Button>{t('components:ModalValidate.add_file')}</Button>
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
        <div className="flex justify-between items-center">
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
