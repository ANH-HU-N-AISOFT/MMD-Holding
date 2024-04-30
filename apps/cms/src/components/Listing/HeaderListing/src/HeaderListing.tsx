import { PlusOutlined, ImportOutlined, ExportOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC, ReactNode } from 'react';

export interface HeaderListingProps {
  title: ReactNode;
  exportBtn: ReactNode;
  importBtn: ReactNode;
  createBtn: ReactNode;
  onExport?: () => void;
  onImport?: () => void;
  onCreate?: () => void;
  isExporting?: boolean;
}

export const HeaderListing: FC<HeaderListingProps> = ({
  title,
  exportBtn,
  importBtn,
  createBtn,
  onCreate,
  onExport,
  onImport,
  isExporting,
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-4">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="flex items-center gap-2">
        <Button loading={isExporting} onClick={onExport} icon={<ExportOutlined />}>
          {exportBtn}
        </Button>
        <Button onClick={onImport} className="hidden sm:block" icon={<ImportOutlined />}>
          {importBtn}
        </Button>
        <Button onClick={onCreate} icon={<PlusOutlined />} type="primary">
          {createBtn}
        </Button>
      </div>
    </div>
  );
};
