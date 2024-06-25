import { Switch as AntSwitch, SwitchProps as AntSwitchProps } from 'antd';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { useDeepCompareEffect, useIsMounted } from '../../../../../hooks';
import { useInitializeContext } from '../../../base';

export interface Props
  extends Pick<
    AntSwitchProps,
    'className' | 'checked' | 'checkedChildren' | 'unCheckedChildren' | 'disabled' | 'loading'
  > {
  /** Callback function triggered when the switch state changes. */
  onChange?: (value: boolean) => void;
}

/**
 * Switch component that extends the functionality of the Ant Design Switch component
 * by providing additional customization and support for stricter type safety.
 *
 * @param {Props} props - The properties for the Switch component.
 * @param {boolean} [props.checked] - The checked state of the switch.
 * @param {ReactNode} [props.checkedChildren] - Content to be displayed when the switch is checked.
 * @param {string} [props.className] - Custom CSS class for styling the switch.
 * @param {boolean} [props.disabled] - Whether the switch is disabled.
 * @param {boolean} [props.loading] - Whether the switch is in loading state.
 * @param {Function} [props.onChange] - Callback function triggered when the switch state changes.
 * @param {ReactNode} [props.unCheckedChildren] - Content to be displayed when the switch is unchecked.
 * @returns {ReactNode} The rendered Switch component.
 */
export const Switch: FC<Props> = ({
  checked,
  checkedChildren,
  className,
  disabled,
  loading,
  onChange,
  unCheckedChildren,
}) => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [checkedState, setCheckedState] = useState(checked);

  const handleChange: AntSwitchProps['onChange'] = checked => {
    setCheckedState(checked);
    onChange?.(checked);
  };

  useDeepCompareEffect(() => {
    setCheckedState(checked);
  }, [checked]);

  return (
    <AntSwitch
      checked={isMounted ? checkedState : undefined}
      checkedChildren={checkedChildren}
      className={classNames('Switch__container', className)}
      disabled={disabled}
      loading={loading}
      onChange={handleChange}
      unCheckedChildren={unCheckedChildren}
    />
  );
};
