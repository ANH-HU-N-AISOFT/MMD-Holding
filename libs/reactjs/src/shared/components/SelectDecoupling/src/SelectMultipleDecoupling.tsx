import { isEmpty } from 'ramda';
import { DependencyList, ReactNode, useState } from 'react';
import { AnyRecord } from 'typescript-utilities';
import { useDeepCompareEffect } from '../../../hooks';
import { SelectMultiple, SelectMultipleProps } from '../../AntCustom';
import { OptionRawDataWithSearchValue } from './types/OptionRawDataWithSearchValue';
import { OptionWithRawData } from './types/OptionWithRawData';

export interface SelectMultipleDecouplingProps<Model extends AnyRecord, ModelId extends Array<string | number>>
  extends Omit<
    SelectMultipleProps<ModelId>,
    'options' | 'onChange' | 'filterOption' | 'onDropdownVisibleChange' | 'open' | 'searchValue' | 'onSearch'
  > {
  /** A function to fetch data from a service. */
  service: () => Promise<Model[]> | Model[];
  /** A function to transform the fetched model data into options for the Select component. */
  transformToOption: (model: Model, index?: number) => OptionRawDataWithSearchValue<Model, ModelId[number]>;
  /**
   * Callback function triggered when the selected values change.
   * @param {ModelId | undefined} value - The selected value(s).
   * @param {OptionWithRawData<Model>[] | undefined} options - The selected option(s).
   * Because "searchValue" only for search functionality ==> "option" in "onChange" will omit "searchValue"
   */
  onChange?: (value: ModelId | undefined, options: OptionWithRawData<Model, ModelId[number]>[] | undefined) => void;
  /** An array of dependencies to watch for fetching data. */
  depsFetch?: DependencyList;
  /** An array of dependencies to watch for transforming options. */
  depsTransformOption?: DependencyList;
  extraModels?: Model[];
}

/**
 * SelectMultipleDecoupling component provides a more flexible approach for working with Select components,
 * allowing for separate data fetching and option transformation functions.
 * with separate data fetching and option transformation functions.
 * @template Model - The type of the data model.
 * @template ModelId - The type of the selected model IDs.
 * @param {SelectMultipleDecouplingProps<Model, ModelId>} props - The component props.
 * @returns {ReactNode} - The rendered SelectMultipleDecoupling component.
 */
export const SelectMultipleDecoupling = <Model extends AnyRecord, ModelId extends Array<string | number>>({
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
  extraModels = [],
}: SelectMultipleDecouplingProps<Model, ModelId>): ReactNode => {
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<OptionWithRawData<Model, ModelId[number]>[]>([]);
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

  const handleSelect: SelectMultipleProps<ModelId, Model>['onChange'] = (values, options) => {
    const isUndefined = isEmpty(values) || null;
    onChange?.(isUndefined ? undefined : values, isUndefined ? undefined : options);
  };

  useDeepCompareEffect(() => {
    handleFetch();
  }, [...depsFetch]);

  useDeepCompareEffect(() => {
    const transformData =
      response.concat(extraModels)?.map((item, index) => ({ ...transformToOption(item, index), rawData: item })) ?? [];
    setOptions(transformData);
  }, [response, extraModels, ...depsTransformOption]);

  return (
    <SelectMultiple
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
