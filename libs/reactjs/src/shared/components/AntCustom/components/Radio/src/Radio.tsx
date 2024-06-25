import { Radio as AntRadio, RadioGroupProps as AntRadioGroupProps } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ReactNode, useMemo, useState } from 'react';
import { useDeepCompareEffect, useIsMounted } from '../../../../../hooks';
import { useInitializeContext } from '../../../base';

type ValueType = string | number | boolean;
export interface Props<Value extends ValueType>
  extends Pick<AntRadioGroupProps, 'className' | 'disabled' | 'optionType'> {
  /** The currently selected value. */
  value?: Value;
  /**
   * Callback function triggered when the selected value changes.
   * @param {Value} value - The new selected value.
   */
  onChange?: (value: undefined | Value) => void;
  /** The list of radio items. */
  items: Array<{
    /** The label of the radio item. */
    label: ReactNode;
    /** The value of the radio item. */
    value: Value;
    /** Whether the radio item is disabled. */
    disabled?: boolean;
    /** Whether the radio item is hidden. */
    hidden?: boolean;
  }>;
}

/**
 * Radio component that extends the functionality of the Ant Design Radio component
 * by providing additional customization and support for stricter type safety.
 *
 * @param {Props<Value>} props - The properties for the Radio component.
 * @param {string} [props.className] - Custom CSS class for styling the radio group.
 * @param {boolean} [props.disabled] - Whether the radio group is disabled.
 * @param {Function} [props.onChange] - Callback function triggered when the selected value changes.
 * @param {string} [props.value] - The currently selected value.
 * @param {Array<{ label: ReactNode, value: string, disabled?: boolean, hidden?: boolean }>} props.items - The list of radio items.
 * @param {string} [props.optionType] - The option type of the radio group.
 * @returns {ReactNode} The rendered Radio component.
 */
export const Radio = <Value extends ValueType>({
  className,
  disabled,
  onChange,
  value,
  items,
  optionType,
}: Props<Value>): ReactNode => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);

  const handleChange: AntRadioGroupProps['onChange'] = event => {
    const isUndefined = isEmpty(event.target.value) || null;
    const value = isUndefined ? undefined : event.target.value;
    setValueState(value);
    onChange?.(value);
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  const items_ = useMemo(() => {
    return items.filter(item => !item.hidden);
  }, [items]);
  return (
    <AntRadio.Group
      optionType={optionType}
      value={isMounted ? valueState : undefined}
      onChange={handleChange}
      className={classNames('Radio__container', className)}
      disabled={disabled}
      options={items_}
    />
  );
};

Radio.Group = AntRadio.Group;
