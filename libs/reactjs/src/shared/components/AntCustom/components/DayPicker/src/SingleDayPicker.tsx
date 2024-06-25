import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, ReactNode, useMemo, useState } from 'react';
import { Dayjs } from 'utilities';
import { useDeepCompareEffect, useIsMounted } from '../../../../../hooks';
import './css/SingleDayPicker.css';
import { useInitializeContext } from '../../../base';
import { AntDatePicker, AntDatePickerProps } from '../../../base/AntDatePicker';
import { Format } from './types/Format';
import { detectTimeComponents } from './utils/detectTimeComponents';

export interface Props
  extends Pick<
    AntDatePickerProps,
    'className' | 'allowClear' | 'disabled' | 'showNow' | 'suffixIcon' | 'locale' | 'onBlur' | 'onFocus'
  > {
  /** Function to specify the dates that should be disabled */
  disabledDate?: (date: Dayjs) => boolean;
  /** A function that returns an array of disabled hours. */
  disabledHours?: () => number[];
  /**  A function that returns an array of disabled minutes based on the provided hour. */
  disabledMinutes?: (params: { hours: number }) => number[];
  /** A function that returns an array of disabled seconds based on the provided hour and minute. */
  disabledSeconds?: (params: { hours: number; minutes: number }) => number[];
  /** Preset ranges for quick selection. */
  presets?: Array<{ label: ReactNode; value: Dayjs }>;
  /** Placeholder text for the input. */
  placeholder?: string;
  /** The format in which the date and/or time is displayed. */
  format?: Format;
  /** The currently selected date and time value. */
  value?: Dayjs;
  /** A function to handle changes to the selected date and time value. */
  onChange?: (value: Dayjs | undefined) => void;
}

/**
 * `SingleDayPicker` is a component that allows users to select a single day, with optional time components.
 * It provides various customization options such as disabling specific hours, minutes, and seconds.
 *
 * @param {Props} props - The properties for the RangeDayPicker component.
 * @param {string} [props.className] - Custom CSS class for the date picker.
 * @param {boolean} [props.allowClear] - Whether to show a clear button.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {boolean} [props.disabled] - Whether the date picker is disabled.
 * @param {Object[]} [props.presets] - Preset ranges for quick selection.
 * @param {boolean} [props.showNow] - Whether to show the "Now" button.
 * @param {Function} [props.disabledDate] - Function to specify the dates that should be disabled.
 * @param {ReactNode} [props.suffixIcon] - Custom suffix icon for the date picker.
 * @param {Object} [props.locale] - Locale configuration for the date picker.
 * @param {Function} [props.disabledHours] - Function to specify the hours that should be disabled.
 * @param {Function} [props.disabledMinutes] - Function to specify the minutes that should be disabled.
 * @param {Function} [props.disabledSeconds] - Function to specify the seconds that should be disabled.
 * @param {Format} [props.format] - Format for displaying the date and time.
 * @param {[Dayjs, Dayjs]} [props.value] - Current value of the date range picker.
 * @param {Function} [props.onChange] - Callback function triggered when the selected date range changes.
 * @param {Function} [props.onBlur] - Callback function triggered when blur the date picker.
 * @param {Function} [props.onFocus] - Callback function triggered when focus the date picker.
 * @returns {JSX.Element} The rendered `SingleDayPicker` component.
 */
export const SingleDayPicker: FC<Props> = ({
  allowClear = true,
  className,
  disabled,
  placeholder,
  format = 'DD/MM/YYYY',
  presets,
  showNow = true,
  suffixIcon,
  disabledDate,
  disabledHours = (): number[] => [],
  disabledMinutes = (): number[] => [],
  disabledSeconds = (): number[] => [],
  locale,
  onBlur = (): void => undefined,
  onFocus = (): void => undefined,
  onChange = (): void => undefined,
  value,
}: Props) => {
  useInitializeContext();
  const [valueState, setValueState] = useState(value);
  const isMounted = useIsMounted();

  const { hasHour, hasMinute, hasSecond } = useMemo(() => {
    return detectTimeComponents(format);
  }, [format]);

  const handleChange: Props['onChange'] = value => {
    let value_ = value;
    if (hasSecond) {
      value_ = value?.startOf('second');
    } else if (hasMinute) {
      value_ = value?.startOf('minute');
    } else if (hasHour) {
      value_ = value?.startOf('hour');
    } else {
      value_ = value?.startOf('day');
    }

    const isUndefined = isEmpty(value_) || null;
    setValueState(isUndefined ? undefined : value_);
    onChange?.(isUndefined ? undefined : value_);
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value?.valueOf()]);

  return (
    <AntDatePicker
      onBlur={onBlur}
      onFocus={onFocus}
      needConfirm
      picker="date"
      locale={locale}
      placeholder={placeholder}
      disabled={disabled}
      allowClear={allowClear}
      format={format}
      presets={presets}
      showNow={showNow}
      showTime={{
        showHour: hasHour,
        showMinute: hasMinute,
        showSecond: hasSecond,
        showMillisecond: false,
        disabledTime: () => ({
          disabledHours,
          disabledMinutes: hours => disabledMinutes({ hours }),
          disabledSeconds: (hours, minutes) => disabledSeconds({ hours, minutes }),
        }),
      }}
      disabledDate={disabledDate}
      suffixIcon={suffixIcon}
      popupClassName="SingleDayPicker__popup"
      className={classNames('SingleDayPicker__container', className)}
      onChange={handleChange}
      value={isMounted ? valueState : undefined}
    />
  );
};
