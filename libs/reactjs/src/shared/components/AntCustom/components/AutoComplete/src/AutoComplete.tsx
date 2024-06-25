import { AutoComplete as AntAutoComplete, AutoCompleteProps as AntAutoCompleteProps, Spin } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, ReactNode, useMemo, useState } from 'react';
import { useDeepCompareEffect } from '../../../../../hooks';
import './styles.css';
import { useInitializeContext } from '../../../base';
import { Option } from './types/Option';
import { OptionValueType } from './types/OptionValueType';
import { baseFilterOption } from './utils/baseFilterOption';

export interface Props<ValueType extends OptionValueType, RawData = any>
  extends Pick<
    AntAutoCompleteProps<ValueType, Option<ValueType, RawData>>,
    | 'allowClear'
    | 'disabled'
    | 'placeholder'
    | 'className'
    | 'notFoundContent'
    | 'filterOption'
    | 'onBlur'
    | 'onFocus'
    | 'searchValue'
    | 'open'
    | 'onSearch'
    | 'onDropdownVisibleChange'
  > {
  /** The current input value. */
  value?: ValueType;
  /** Callback function that is triggered when the input value changes. */
  onChange?: (value: ValueType | undefined, option: Option<ValueType, RawData> | undefined) => void;
  /** Whether the component is in a loading state, showing a loading indicator. */
  loading?: boolean;
  /** Array of options to be displayed in the dropdown menu. */
  options?: Option<ValueType, RawData>[];
}

/**
 * AutoComplete component that provides an input field with dropdown suggestions based on user input.
 *
 * @template ValueType - The type of the value for each option.
 * @template RawData - The raw data type for each option.
 *
 * @param {Props<ValueType, RawData>} props - The properties for the AutoComplete component.
 * @param {boolean} [props.allowClear=true] - Whether to show a clear button allowing the user to clear the input.
 * @param {boolean} [props.disabled] - Whether the AutoComplete component is disabled.
 * @param {string} [props.placeholder] - Placeholder text to display when the input is empty.
 * @param {string} [props.className] - Custom CSS class for styling the component.
 * @param {ReactNode} [props.notFoundContent] - Content to display when no options match the input.
 * @param {boolean} [props.loading=false] - Whether the component is in a loading state.
 * @param {string} [props.value] - The current value of the input.
 * @param {(value: string | undefined, option: Option<ValueType, RawData> | undefined) => void} [props.onChange] - Callback function that is triggered when the input value changes.
 * @param {boolean | ((inputValue: string, option: Option<ValueType, RawData>) => boolean)} [props.filterOption=baseFilterOption] - Custom filter function to determine whether an option should be shown in the dropdown.
 * @param {Option<ValueType, RawData>[]} [props.options=[]] - Array of options to be displayed in the dropdown menu.
 * @param {boolean} [props.open] - Whether the dropdown menu is open.
 * @param {string} [props.searchValue] - The value of the search input.
 * @param {Function} [props.onDropdownVisibleChange] - Callback function that is triggered when the dropdown visibility changes.
 * @param {Function} [props.onSearch] - Callback function that is triggered when the search input value changes.
 * @returns {ReactNode} The rendered AutoComplete component.
 */
export const AutoComplete = <ValueType extends OptionValueType, RawData = any>({
  allowClear = true,
  disabled,
  placeholder,
  className,
  notFoundContent,
  loading = false,
  value,
  filterOption = baseFilterOption,
  options = [],
  open,
  searchValue,
  onChange,
  onBlur,
  onDropdownVisibleChange,
  onFocus,
  onSearch,
}: Props<ValueType, RawData>): ReactNode => {
  useInitializeContext();
  const [valueState, setValueState] = useState(value);

  const handleChange: Props<ValueType>['onChange'] = (value, option) => {
    const isUndefined = isEmpty(value) || null;
    setValueState(isUndefined ? undefined : value);
    onChange?.(isUndefined ? undefined : value, isUndefined ? undefined : option);
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  const options_ = useMemo(() => {
    return options.filter(item => !item.hidden);
  }, [options]);

  const renderLoadingAtDropdown: FC = () => {
    return (
      <div className="AutoComplete__loading">
        <Spin size="large" />
      </div>
    );
  };

  return (
    <AntAutoComplete
      filterOption={filterOption}
      options={options_}
      notFoundContent={loading ? renderLoadingAtDropdown({}) : notFoundContent}
      value={valueState}
      onChange={handleChange as AntAutoCompleteProps<ValueType, Option<ValueType, RawData>>['onChange']}
      allowClear={allowClear}
      disabled={disabled}
      placeholder={placeholder}
      className={classNames('AutoComplete__container', className)}
      open={open}
      searchValue={searchValue}
      onBlur={onBlur}
      onDropdownVisibleChange={onDropdownVisibleChange}
      onFocus={onFocus}
      onSearch={onSearch}
    />
  );
};
