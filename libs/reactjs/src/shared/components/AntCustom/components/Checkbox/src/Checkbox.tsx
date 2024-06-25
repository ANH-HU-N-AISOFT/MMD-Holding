import { Checkbox as AntCheckbox, CheckboxProps as AntCheckboxProps } from 'antd';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { useDeepCompareEffect, useIsMounted } from '../../../../../hooks';
import { useInitializeContext } from '../../../base';

export interface Props
  extends Pick<AntCheckboxProps, 'children' | 'className' | 'checked' | 'disabled' | 'indeterminate'> {
  /**
   * Callback function that is triggered when the checkbox state changes.
   *
   * @param {boolean} value - The new checked state of the checkbox.
   */
  onChange?: (value: boolean) => void;
}

/**
 * Checkbox component that extends the functionality of the Ant Design Checkbox component
 * by providing additional customization and support for stricter type safety.
 * It maintains its own state and triggers a callback function when its state changes.
 *
 * @param {Props} props - The properties for the Checkbox component.
 * @param {ReactNode} [props.children] - Content to be displayed next to the checkbox.
 * @param {string} [props.className] - Custom CSS class for styling the checkbox.
 * @param {boolean} [props.checked] - Whether the checkbox is checked.
 * @param {boolean} [props.disabled] - Whether the checkbox is disabled.
 * @param {boolean} [props.indeterminate] - Whether the checkbox is indeterminate.
 * @param {Function} [props.onChange] - Callback function triggered when the checkbox state changes.
 * @returns {ReactNode} The rendered Checkbox component.
 */
export const Checkbox: FC<Props> = ({ children, className, disabled, indeterminate, checked, onChange }) => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [checkedState, setCheckedState] = useState(checked);

  const handleChange: AntCheckboxProps['onChange'] = event => {
    setCheckedState(event.target.checked);
    onChange?.(event.target.checked);
  };

  useDeepCompareEffect(() => {
    setCheckedState(checked);
  }, [checked]);

  return (
    <AntCheckbox
      children={children}
      className={classNames('Checkbox__container', className)}
      disabled={disabled}
      indeterminate={indeterminate}
      checked={isMounted ? checkedState : undefined}
      onChange={handleChange}
    />
  );
};
