import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select';
import classNames from 'classnames';
import { useState } from 'react';
import { useDeepCompareEffect } from 'reactjs';
import { OmitRawProps } from './types/OmitRawProps';
import { Option } from './types/Option';
import { OptionValueType } from './types/OptionValueType';

export interface Props<ValueType extends OptionValueType> extends OmitRawProps<ValueType> {
  options: Option[];
  value?: ValueType;
  defaultValue?: ValueType;
  onChange?: SelectProps<ValueType | undefined, Option>['onChange'];
}

export const SelectSingle = <ValueType extends OptionValueType = OptionValueType>({
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
}: Props<ValueType>) => {
  const [valueState, setValueState] = useState(value ?? defaultValue);

  const handleChange: Props<ValueType>['onChange'] = (value, option) => {
    setValueState(value);
    onChange?.(value, option);
  };

  const handleClick: Props<ValueType>['onClick'] = event => {
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
      onChange={handleChange}
      value={valueState as any}
      notFoundContent={loading ? renderLoadingAtDropdown() : notFoundContent}
      options={loading ? [] : options}
      allowClear={loading ? false : allowClear}
      className={classNames('w-full', props.className)}
    />
  );
};
