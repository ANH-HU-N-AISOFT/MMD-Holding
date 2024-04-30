import { FileExcelOutlined } from '@ant-design/icons';
import { Button, ModalProps, Typography, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '~/components/AntCustom/Modal';

interface Props extends Omit<ModalProps, 'title' | 'okText' | 'footer'> {
  downSampleUrl: string;
}

export const ModalImport = ({ downSampleUrl, ...props }: Props) => {
  const { t } = useTranslation(['components']);

  const [fileState, setFileState] = useState<File | null>(null);

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
              accept=".csv"
            >
              <Button>{t('components:ModalImport.replace_file')}</Button>
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
        accept=".csv"
        className="block h-[120px]"
      >
        <Button>{t('components:ModalImport.add_file')}</Button>
      </Dragger>
    );
  };

  return (
    <Modal
      {...props}
      title={t('components:ModalImport.title', { type: 'products' })}
      okText={t('components:ModalImport.upload_and_preview')}
      footer={(_, { OkBtn, CancelBtn }) => (
        <div className="flex justify-between items-center">
          <Typography.Link href={downSampleUrl} download target="_blank" className="!underline">
            {t('components:ModalImport.download_sample')}
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
