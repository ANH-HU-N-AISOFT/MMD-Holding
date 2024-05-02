import { DefaultOptionType } from 'antd/es/select';
import { ReactNode } from 'react';

export interface Option<RawData = any> {
  value: string | number;
  label: DefaultOptionType['label'];
  disabled?: DefaultOptionType['disabled'];
  /** Dùng để custom render label của select */
  displayLabel?: ReactNode;
  /** Dùng để filter option */
  searchValue?: string;
  rawData: RawData;
}
