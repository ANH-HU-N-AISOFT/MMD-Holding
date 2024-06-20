import { DatePicker as AntDatePicker, DatePickerProps as AntDatePickerProps } from 'antd';
import { RangePickerProps as AntRangePickerProps } from 'antd/es/date-picker';
import { Dayjs } from 'dayjs';
import { FC } from 'react';

export interface DatePickerProps extends Omit<AntDatePickerProps, 'onChange'> {
  onChange?: (value: undefined | Dayjs) => void;
}

export const DatePicker: FC<DatePickerProps> = ({ format = 'DD/MM/YYYY', ...props }) => {
  // @ts-ignore
  return <AntDatePicker {...props} format={format} />;
};

export interface DateRangePickerProps extends Omit<AntRangePickerProps, 'onChange'> {
  onChange?: (value: undefined | [Dayjs, Dayjs]) => void;
  value?: [Dayjs, Dayjs];
}

// @ts-ignore
export const DateRangePicker: FC<DateRangePickerProps> = AntDatePicker.RangePicker;
