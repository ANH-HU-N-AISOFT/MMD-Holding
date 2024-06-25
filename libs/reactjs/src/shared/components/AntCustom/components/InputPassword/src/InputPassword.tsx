import { Input as AntInput } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ComponentProps, FC, useState } from 'react';
import { useDeepCompareEffect, useIsMounted } from '../../../../../hooks';
import { useInitializeContext } from '../../../base';

type AntInputProps = ComponentProps<typeof AntInput.Password>;

export interface Props
  extends Pick<
    AntInputProps,
    | 'addonAfter'
    | 'addonBefore'
    | 'allowClear'
    | 'className'
    | 'disabled'
    | 'maxLength'
    | 'onBlur'
    | 'onFocus'
    | 'placeholder'
    | 'prefix'
    | 'iconRender'
    | 'readOnly'
    | 'variant'
  > {
  /** The value of the input. */
  value?: string;
  /** Callback function triggered when the input value changes.
   * @param {string} value - The new value of the input.
   */
  onChange?: (value: string | undefined) => void;
  /** Whether the password is show or hide */
  visible?: boolean;
  /** Callback executed when visibility of the password is changed */
  onVisibleChange?: (visible: boolean) => void;
}

/**
 * InputPassword component extends the functionality of the Ant Design Password component
 * by providing additional customization and support for stricter type safety.
 *
 * @param {Props} props - The properties for the InputPassword component.
 * @param {ReactNode} [props.addonAfter] - The element to display on the right side of the input field.
 * @param {ReactNode} [props.addonBefore] - The element to display on the left side of the input field.
 * @param {boolean} [props.allowClear=true] - Whether to allow clear the input field.
 * @param {string} [props.className] - Custom CSS class for styling the input field.
 * @param {boolean} [props.disabled=false] - Whether the input field is disabled.
 * @param {number} [props.maxLength] - The maximum length of the input value.
 * @param {Function} [props.onBlur] - Callback function triggered when the input field is blurred.
 * @param {Function} [props.onFocus] - Callback function triggered when the input field is focused.
 * @param {string} [props.placeholder] - The placeholder text for the input field.
 * @param {ReactNode} [props.prefix] - The prefix icon or text for the input field.
 * @param {string} [props.value] - The value of the input field.
 * @param {Function} [props.onChange] - Callback function triggered when the input value changes.
 * @param {Function} [props.iconRender] - Custom icon render function for the visibility toggle button.
 * @param {boolean} [props.visible] - Whether the password is shown or hidden.
 * @param {Function} [props.onVisibleChange] - Callback executed when the visibility of the password is changed.
 * @returns {ReactNode} The rendered InputPassword component.
 */
export const InputPassword: FC<Props> = ({
  addonAfter,
  addonBefore,
  allowClear = true,
  className,
  disabled = false,
  maxLength,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  prefix,
  value,
  iconRender,
  onVisibleChange,
  visible,
  readOnly,
  variant,
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
    <AntInput.Password
      readOnly={readOnly}
      variant={variant}
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      allowClear={allowClear}
      className={classNames('InputPassword__container', className)}
      disabled={disabled}
      maxLength={maxLength}
      onBlur={onBlur}
      onChange={handleChange}
      onFocus={onFocus}
      placeholder={placeholder}
      prefix={prefix}
      value={isMounted ? valueState : undefined}
      iconRender={iconRender}
      visibilityToggle={{ visible, onVisibleChange }}
    />
  );
};
