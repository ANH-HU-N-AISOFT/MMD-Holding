import { SelectProps } from 'antd';
import { Option } from './Option';

export type OmitRawProps<ValueType> = Omit<
  SelectProps<ValueType, Option>,
  'mode' | 'options' | 'value' | 'defaultValue' | 'onChange'
>;
