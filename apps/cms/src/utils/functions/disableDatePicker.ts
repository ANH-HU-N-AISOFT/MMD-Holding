import dayjs, { Dayjs } from 'dayjs';
import { DatePickerProps } from '~/components/AntCustom/DatePicker/DatePicker';

export const disablePast: DatePickerProps['disabledDate'] = date => {
  return date.isBefore(dayjs().startOf('day'));
};

export const disableFuture: DatePickerProps['disabledDate'] = date => {
  return date.isAfter(dayjs().startOf('day'));
};

export const disableAfterCheckpoint =
  (checkpoint: Dayjs): DatePickerProps['disabledDate'] =>
  date => {
    return date.isAfter(dayjs(checkpoint).startOf('day'));
  };

export const disableBeforeCheckpoint =
  (checkpoint: Dayjs): DatePickerProps['disabledDate'] =>
  date => {
    return date.isBefore(dayjs(checkpoint).startOf('day'));
  };
