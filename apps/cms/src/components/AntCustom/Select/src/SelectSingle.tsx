import { Select, Spin } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import { useDeepCompareEffect } from 'reactjs';
import { OmitRawProps } from './types/OmitRawProps';
import { Option } from './types/Option';
import { OptionValueType } from './types/OptionValueType';

export interface Props<ValueType extends OptionValueType, RawData = any> extends OmitRawProps<ValueType> {
  options: Option<RawData>[];
  value?: ValueType;
  defaultValue?: ValueType;
  onChange?: (value: ValueType, option?: Option<RawData>) => void;
}

export const SelectSingle = <ValueType extends OptionValueType = OptionValueType, RawData = any>({
  value,
  defaultValue,
  onChange,
  loading,
  notFoundContent,
  options,
  allowClear,
  placeholder,
  disabled,
  ...props
}: Props<ValueType, RawData>) => {
  const [valueState, setValueState] = useState(value ?? defaultValue);

  const handleChange: Props<ValueType, RawData>['onChange'] = (value, option) => {
    setValueState(value);
    onChange?.(value, option);
  };

  const handleClick: Props<ValueType, RawData>['onClick'] = event => {
    event.stopPropagation();
    props.onClick?.(event);
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  const renderLoadingAtDropdown = () => {
    return (
      <div className="py-4 text-center">
        <Spin size="large" />
      </div>
    );
  };

  return (
    <Select
      {...props}
      placeholder={!valueState && disabled ? null : placeholder}
      disabled={disabled}
      onClick={handleClick}
      onChange={handleChange as any}
      value={valueState as any}
      notFoundContent={loading ? renderLoadingAtDropdown() : notFoundContent}
      options={loading ? [] : options}
      allowClear={loading ? false : allowClear}
      className={classNames('w-full', props.className)}
    />
  );
};
