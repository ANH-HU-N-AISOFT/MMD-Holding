import { DatePickerProps } from 'antd';
import { dayjs, Dayjs } from 'utilities';

export const disablePast: DatePickerProps<Dayjs>['disabledDate'] = date => {
  return date.isBefore(dayjs().startOf('day'));
};

export const disableFuture: DatePickerProps<Dayjs>['disabledDate'] = date => {
  return date.isAfter(dayjs().startOf('day'));
};

export const disableAfterCheckpoint =
  (checkpoint: Dayjs): DatePickerProps<Dayjs>['disabledDate'] =>
  date => {
    return date.isAfter(dayjs(checkpoint).startOf('day'));
  };

export const disableBeforeCheckpoint =
  (checkpoint: Dayjs): DatePickerProps<Dayjs>['disabledDate'] =>
  date => {
    return date.isBefore(dayjs(checkpoint).startOf('day'));
  };
