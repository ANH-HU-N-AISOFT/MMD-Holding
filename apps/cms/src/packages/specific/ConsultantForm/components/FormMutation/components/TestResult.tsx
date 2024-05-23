import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { FormValues } from '../FormMutation';
import { useRemixForm } from '~/overrides/@remix-hook-form';

interface Props {
  form: ReturnType<typeof useRemixForm<Partial<FormValues>>>;
  disabledField: boolean;
}

export const TestResult = (_: Props) => {
  return (
    <div>
      <Dragger showUploadList={false} accept="image/png, image/jpg, image/jpeg">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
        </p>
      </Dragger>
    </div>
  );
};
