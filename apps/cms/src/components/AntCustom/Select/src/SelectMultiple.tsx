import { Select, Spin } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { useState } from 'react';
import { useDeepCompareEffect } from 'reactjs';
import { OmitRawProps } from './types/OmitRawProps';
import { Option } from './types/Option';
import { OptionValueType } from './types/OptionValueType';
import { baseFilterOption } from '~/utils/functions/baseFilterOption';

export interface Props<ValueType extends OptionValueType[], RawData = any> extends OmitRawProps<ValueType> {
  options: Option<RawData>[];
  value?: ValueType;
  defaultValue?: ValueType;
  onChange?: (value: ValueType | undefined, option?: Option<RawData>[]) => void;
}

export const SelectMultiple = <ValueType extends OptionValueType[] = OptionValueType[]>({
  value,
  defaultValue,
  onChange,
  loading,
  notFoundContent,
  options,
  allowClear,
  placeholder,
  disabled,
  autoClearSearchValue = true,
  filterOption = baseFilterOption,
  ...props
}: Props<ValueType>) => {
  const [valueState, setValueState] = useState(value ?? defaultValue);

  const handleChange: Props<ValueType>['onChange'] = (value, option) => {
    const isUndefined = isEmpty(value);
    setValueState(isUndefined ? undefined : value);
    onChange?.(isUndefined ? undefined : value, option);
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
      filterOption={filterOption}
      autoClearSearchValue={autoClearSearchValue}
      mode="multiple"
      disabled={disabled}
      placeholder={!valueState?.length && disabled ? null : placeholder}
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
