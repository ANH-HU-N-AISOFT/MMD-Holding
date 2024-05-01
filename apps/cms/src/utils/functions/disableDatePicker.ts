import { DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

export const disablePast: DatePickerProps<Dayjs>['disabledDate'] = date => {
  // @ts-ignore
  return date.isBefore(dayjs().startOf('day'));
};

export const disableFuture: DatePickerProps<Dayjs>['disabledDate'] = date => {
  // @ts-ignore
  return date.isAfter(dayjs().startOf('day'));
};

export const disableAfterCheckpoint =
  (checkpoint: Dayjs): DatePickerProps<Dayjs>['disabledDate'] =>
  date => {
    // @ts-ignore
    return date.isAfter(dayjs(checkpoint).startOf('day'));
  };

export const disableBeforeCheckpoint =
  (checkpoint: Dayjs): DatePickerProps<Dayjs>['disabledDate'] =>
  date => {
    // @ts-ignore
    return date.isBefore(dayjs(checkpoint).startOf('day'));
  };
