import { Input as AntInput } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ComponentProps, FC, useState } from 'react';
import { useDeepCompareEffect, useIsMounted } from '../../../../../hooks';
import { useInitializeContext } from '../../../base';

type AntInputProps = ComponentProps<typeof AntInput.OTP>;

export interface Props extends Pick<AntInputProps, 'disabled' | 'onBlur' | 'onFocus' | 'formatter' | 'mask'> {
  /** Custom CSS class for styling the input field. */
  className?: string;
  /** The value of the input. */
  value?: string;
  /** Callback function triggered when the input value changes.
   * @param {string} value - The new value of the input.
   */
  onChange?: (value: string | undefined) => void;
  /** The length of the OTP input. */
  length: number;
}

/**
 * InputOTP component extends the functionality of the Ant Design OTP Input component
 * by providing additional customization and support for stricter type safety.
 *
 * @param {Props} props - The properties for the InputOTP component.
 * @param {string} [props.className] - Custom CSS class for styling the input field.
 * @param {boolean} [props.disabled=false] - Whether the input field is disabled.
 * @param {Function} [props.onBlur] - Callback function triggered when the input field is blurred.
 * @param {Function} [props.onFocus] - Callback function triggered when the input field is focused.
 * @param {string} [props.value] - The value of the input field.
 * @param {Function} [props.onChange] - Callback function triggered when the input value changes.
 * @param {number} props.length - The length of the OTP input.
 * @param {Function} [props.formatter] - A function for formatting the displayed value.
 * @param {boolean} [props.mask] - Whether to mask the input characters.
 * @returns {ReactNode} The rendered InputOTP component.
 */
export const InputOTP: FC<Props> = ({
  className,
  disabled = false,
  onBlur,
  onChange,
  onFocus,
  value,
  length,
  formatter,
  mask,
}) => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const handleChange: AntInputProps['onChange'] = value => {
    const isUndefined = isEmpty(value) || null;
    const value_ = isUndefined ? undefined : value;
    setValueState(value_);
    onChange?.(value_);
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  return (
    <div className={classNames('InputOTP__container', className)}>
      <AntInput.OTP
        length={length}
        disabled={disabled}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
        value={isMounted ? valueState : undefined}
        formatter={formatter}
        mask={mask}
      />
    </div>
  );
};
