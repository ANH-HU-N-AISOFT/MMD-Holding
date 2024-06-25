import { Input as AntInput } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ComponentProps, FC, useState } from 'react';
import { useDeepCompareEffect, useIsMounted } from '../../../../../hooks';
import { useInitializeContext } from '../../../base';

type AntInputProps = ComponentProps<typeof AntInput.TextArea>;

export interface Props
  extends Pick<
    AntInputProps,
    'className' | 'disabled' | 'maxLength' | 'onBlur' | 'onFocus' | 'placeholder' | 'prefix' | 'showCount' | 'rows'
  > {
  /** The value of the input. */
  value?: string;
  /** Callback function triggered when the input value changes.
   * @param {string} value - The new value of the input.
   */
  onChange?: (value: string | undefined) => void;
}

/**
 * Textarea component that extends the functionality of the Ant Design TextArea component
 * by providing additional customization and support for stricter type safety.
 *
 * @param {Props} props - The properties for the Textarea component.
 * @param {string} [props.className] - Custom CSS class for styling the text area.
 * @param {boolean} [props.disabled=false] - Whether the text area is disabled.
 * @param {number} [props.maxLength] - The maximum length of the input.
 * @param {Function} [props.onBlur] - Callback function triggered when the text area loses focus.
 * @param {Function} [props.onFocus] - Callback function triggered when the text area gains focus.
 * @param {string} [props.placeholder] - Placeholder text for the text area.
 * @param {ReactNode} [props.prefix] - Prefix element for the text area.
 * @param {boolean} [props.showCount=true] - Whether to display the character count.
 * @param {number} [props.rows=6] - Number of rows in the text area.
 * @param {string} [props.value] - The value of the text area.
 * @param {Function} [props.onChange] - Callback function triggered when the text area value changes.
 * @returns {ReactNode} The rendered Textarea component.
 */
export const Textarea: FC<Props> = ({
  className,
  disabled = false,
  maxLength,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  prefix,
  value,
  showCount = true,
  rows = 6,
}) => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const handleChange: AntInputProps['onChange'] = event => {
    const isUndefined = isEmpty(event.target.value) || null;
    const value = isUndefined ? undefined : event.target.value;
    setValueState(value);
    onChange?.(value);
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  return (
    <AntInput.TextArea
      className={classNames('Textarea__container', className)}
      disabled={disabled}
      maxLength={maxLength}
      onBlur={onBlur}
      onChange={handleChange}
      onFocus={onFocus}
      placeholder={placeholder}
      prefix={prefix}
      value={isMounted ? valueState : undefined}
      showCount={!!maxLength && showCount}
      rows={rows}
    />
  );
};
