import { isEmpty } from 'ramda';
import { DependencyList, ReactNode, useState } from 'react';
import { AnyRecord } from 'typescript-utilities';
import { useDeepCompareEffect } from '../../../hooks';
import { SelectSingle, SelectSingleProps } from '../../AntCustom';
import { OptionRawDataWithSearchValue } from './types/OptionRawDataWithSearchValue';
import { OptionWithRawData } from './types/OptionWithRawData';

export interface SelectSingleDecouplingProps<Model extends AnyRecord, ModelId extends string | number>
  extends Omit<
    SelectSingleProps<ModelId>,
    'options' | 'onChange' | 'filterOption' | 'onDropdownVisibleChange' | 'open' | 'searchValue' | 'onSearch'
  > {
  /** A function to fetch data from a service. */
  service: () => Promise<Model[]> | Model[];
  /** A function to transform the fetched model data into options for the Select component. */
  transformToOption: (model: Model, index?: number) => OptionRawDataWithSearchValue<Model, ModelId>;
  /**
   * Callback function triggered when the selected value changes.
   * @param {ModelId | undefined} value - The selected value.
   * @param {OptionWithRawData<Model> | undefined} option - The selected option.
   * Because "searchValue" only for search functionality ==> "option" in "onChange" will omit "searchValue"
   */
  onChange?: (value: ModelId | undefined, option: OptionWithRawData<Model, ModelId> | undefined) => void;
  /** An array of dependencies to watch for fetching data. */
  depsFetch?: DependencyList;
  /** An array of dependencies to watch for transforming options. */
  depsTransformOption?: DependencyList;
}

/**
 * SelectSingleDecoupling component provides a more flexible approach for working with Select components,
 * allowing for separate data fetching and option transformation functions.
 * @template Model - The type of the data model.
 * @template ModelId - The type of the selected model ID.
 * @param {SelectSingleDecouplingProps<Model, ModelId>} props - The component props.
 * @returns {ReactNode} - The rendered SelectSingleDecoupling component.
 */
export const SelectSingleDecoupling = <Model extends AnyRecord, ModelId extends string | number>({
  transformToOption,
  service,
  onChange,
  loading,
  depsFetch = [],
  depsTransformOption = [],
  allowClear,
  autoClearSearchValue,
  className,
  direction,
  disabled,
  notFoundContent,
  onBlur,
  onFocus,
  optionLabelProp,
  placeholder,
  value,
}: SelectSingleDecouplingProps<Model, ModelId>): ReactNode => {
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<OptionWithRawData<Model, ModelId>[]>([]);
  const [response, setResponse] = useState<Model[]>([]);

  const handleFetch = async (): Promise<void> => {
    setIsFetching(true);
    try {
      const items = await service();
      const transformData = items?.map((item, index) => ({ ...transformToOption(item, index), rawData: item })) ?? [];
      setOptions(transformData);
      setResponse(items);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSelect: SelectSingleProps<ModelId, Model>['onChange'] = (values, options) => {
    const isUndefined = isEmpty(values) || null;
    onChange?.(isUndefined ? undefined : values, isUndefined ? undefined : options);
  };

  useDeepCompareEffect(() => {
    handleFetch();
  }, [...depsFetch]);

  useDeepCompareEffect(() => {
    const transformData = response?.map((item, index) => ({ ...transformToOption(item, index), rawData: item })) ?? [];
    setOptions(transformData);
  }, [response, ...depsTransformOption]);

  return (
    <SelectSingle<ModelId, Model>
      onChange={handleSelect}
      options={options}
      loading={loading || isFetching}
      allowClear={allowClear}
      autoClearSearchValue={autoClearSearchValue}
      className={className}
      direction={direction}
      disabled={disabled}
      notFoundContent={notFoundContent}
      onBlur={onBlur}
      onFocus={onFocus}
      optionLabelProp={optionLabelProp}
      placeholder={placeholder}
      value={value}
    />
  );
};
