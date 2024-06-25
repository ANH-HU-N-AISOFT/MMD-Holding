import { Slider as AntSlider } from 'antd';
import { Formatter, SliderRangeProps as AntSliderRangeProps } from 'antd/es/slider';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, ReactNode, useState } from 'react';
import { useDeepCompareEffect, useIsMounted } from '../../../../../hooks';
import { useInitializeContext } from '../../../base';

type Value = [number, number];

export interface Props
  extends Pick<
    AntSliderRangeProps,
    'className' | 'disabled' | 'step' | 'min' | 'max' | 'onBlur' | 'onFocus' | 'vertical'
  > {
  /** The direction of the slider. */
  direction?: 'ltr' | 'rtl';
  /** Formatter function for the tooltip. */
  tooltipFormatter?: Formatter;
  /** Whether to hide the coordinative (the track of the slider). */
  hideCoordinative?: boolean;
  /** Marks on the slider track. */
  marks?: Record<number, ReactNode>;
  /** The value of the slider. */
  value?: Value;
  /** Callback function triggered when the slider value changes. */
  onChange?: (value: undefined | Value) => void;
}

/**
 * RangeSlider component that extends the functionality of the Ant Design Slider component
 * by providing additional customization and support for stricter type safety.
 *
 * @param {Props} props - The properties for the RangeSlider component.
 * @param {string} [props.className] - Custom CSS class for styling the slider.
 * @param {boolean} [props.disabled=false] - Whether the slider is disabled.
 * @param {number} [props.value] - The value of the slider.
 * @param {Function} [props.onChange] - Callback function triggered when the slider value changes.
 * @param {number} [props.step] - The granularity the slider can step through values.
 * @param {number} [props.min=0] - The minimum value the slider can slide to.
 * @param {number} [props.max=100] - The maximum value the slider can slide to.
 * @param {Function} [props.onBlur] - Callback function triggered when the slider loses focus.
 * @param {Function} [props.onFocus] - Callback function triggered when the slider gains focus.
 * @param {boolean} [props.vertical=false] - Whether the slider is vertical.
 * @param {string} [props.direction='ltr'] - The direction of the slider.
 * @param {Formatter} [props.tooltipFormatter] - Formatter function for the tooltip.
 * @param {boolean} [props.hideCoordinative=false] - Whether to hide the coordinative (the track of the slider).
 * @param {Record<number, ReactNode>} [props.marks={}] - Marks on the slider track.
 * @returns {ReactNode} The rendered RangeSlider component.
 */
export const RangeSlider: FC<Props> = ({
  className,
  disabled,
  onChange,
  step,
  value,
  max = 100,
  min = 0,
  direction = 'ltr',
  tooltipFormatter,
  onBlur,
  onFocus,
  hideCoordinative = false,
  vertical = false,
  marks = {},
}) => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const handleChange: AntSliderRangeProps['onChange'] = value => {
    setValueState(value as Value);
  };

  const handleChangeComplete: AntSliderRangeProps['onChangeComplete'] = value => {
    const isUndefined = isEmpty(value) || null;
    setValueState(value as Value);
    onChange?.(isUndefined ? undefined : (value as Value));
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  return (
    <AntSlider
      range
      keyboard
      dots={false}
      className={classNames('RangeSlider__container', className)}
      disabled={disabled}
      included={!hideCoordinative}
      marks={marks}
      max={max}
      min={min}
      onBlur={onBlur}
      onChange={handleChange}
      onChangeComplete={handleChangeComplete}
      onFocus={onFocus}
      reverse={vertical ? direction === 'ltr' : direction === 'rtl'}
      step={step}
      tooltip={{ formatter: tooltipFormatter }}
      value={isMounted ? valueState : undefined}
      vertical={vertical}
    />
  );
};
