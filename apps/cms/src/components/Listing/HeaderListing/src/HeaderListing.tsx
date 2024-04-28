import { PlusOutlined, ImportOutlined, ExportOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC, ReactNode } from 'react';

export interface HeaderListingProps {
  title: ReactNode;
  exportBtn: ReactNode;
  importBtn: ReactNode;
  createBtn: ReactNode;
}

export const HeaderListing: FC<HeaderListingProps> = ({ title, exportBtn, importBtn, createBtn }) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-4">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="flex items-center gap-2">
        <Button icon={<ExportOutlined />}>{exportBtn}</Button>
        <Button className="hidden sm:block" icon={<ImportOutlined />}>
          {importBtn}
        </Button>
        <Button icon={<PlusOutlined />} type="primary">
          {createBtn}
        </Button>
      </div>
    </div>
  );
};
