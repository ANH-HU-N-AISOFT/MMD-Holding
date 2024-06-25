import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, ReactNode, useMemo, useState } from 'react';
import { Dayjs } from 'utilities';
import { useDeepCompareEffect, useIsMounted } from '../../../../../hooks';
import './css/RangeDayPicker.css';
import { useInitializeContext } from '../../../base';
import { AntDatePicker, AntRangePickerProps } from '../../../base/AntDatePicker';
import { Format } from './types/Format';
import { detectTimeComponents } from './utils/detectTimeComponents';

export interface Props
  extends Pick<
    AntRangePickerProps,
    'className' | 'allowClear' | 'disabled' | 'showNow' | 'suffixIcon' | 'locale' | 'onBlur' | 'onFocus'
  > {
  /** Function to specify the dates that should be disabled */
  disabledDate?: (date: Dayjs) => boolean;
  /** Function to specify the hours that should be disabled */
  disabledHours?: () => number[];
  /** Function to specify the minutes that should be disabled based on the selected hour */
  disabledMinutes?: (params: { hours: number }) => number[];
  /** Function to specify the seconds that should be disabled based on the selected hour and minute */
  disabledSeconds?: (params: { hours: number; minutes: number }) => number[];
  /** Preset ranges for quick selection. */
  presets?: Array<{ label: ReactNode; value: [Dayjs, Dayjs] }>;
  /** Placeholder text for the input. */
  placeholder?: [string, string];
  /** Format for displaying the date and time */
  format?: Format;
  /** Current value of the date range picker */
  value?: [Dayjs, Dayjs];
  /** Callback function triggered when the selected date range changes */
  onChange?: (value: [Dayjs, Dayjs] | undefined) => void;
}

/**
 * RangeDayPicker is a functional component that renders a date range picker
 * with additional configurations for disabling specific hours, minutes, and seconds,
 * as well as custom date formats.
 *
 * @param {Props} props - The properties for the RangeDayPicker component.
 * @param {string} [props.className] - Custom CSS class for the date picker.
 * @param {boolean} [props.allowClear] - Whether to show a clear button.
 * @param {[string, string]} [props.placeholder] - Placeholder text for the input.
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
 * @returns {JSX.Element} The rendered date range picker component.
 */
export const RangeDayPicker: FC<Props> = ({
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
    const value_ = value?.map((item, index) => {
      let item_ = item;
      const isStart = index === 0;
      if (hasSecond) {
        item_ = isStart ? item?.startOf('second') : item?.endOf('second');
      } else if (hasMinute) {
        item_ = isStart ? item?.startOf('minute') : item?.endOf('minute');
      } else if (hasHour) {
        item_ = isStart ? item?.startOf('hour') : item?.endOf('hour');
      } else {
        item_ = isStart ? item?.startOf('day') : item?.endOf('day');
      }
      return item_;
    }) as [Dayjs, Dayjs] | undefined;

    const isUndefined = isEmpty(value_) || null;
    setValueState(isUndefined ? undefined : value_);
    onChange?.(isUndefined ? undefined : value_);
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value?.[0].valueOf(), value?.[1].valueOf()]);

  return (
    <AntDatePicker.RangePicker
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
      popupClassName="RangeDayPicker__popup"
      className={classNames('RangeDayPicker__container', className)}
      onChange={handleChange as AntRangePickerProps['onChange']}
      value={isMounted ? (valueState as AntRangePickerProps['value']) : undefined}
    />
  );
};
