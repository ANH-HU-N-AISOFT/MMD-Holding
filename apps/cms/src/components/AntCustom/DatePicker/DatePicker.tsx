import { DatePicker as AntDatePicker, DatePickerProps as AntDatePickerProps } from 'antd';
import { Dayjs } from 'dayjs';
import { FC } from 'react';

export interface DatePickerProps extends Omit<AntDatePickerProps, 'onChange'> {
  onChange?: (value: undefined | Dayjs) => void;
}

// @ts-ignore
export const DatePicker: FC<DatePickerProps> = AntDatePicker;
