import { DependencyList, useEffect, useState } from 'react';
import { AnyRecord } from 'typescript-utilities';
import { Option, SelectMultiple, SelectMultipleProps } from '../AntCustom/Select';
import { OptionRawDataWithSearchValue } from './types/OptionRawDataWithSearchValue';
import { OptionWithRawData } from './types/OptionWithRawData';

export interface SelectMultipleDecouplingProps<Model extends AnyRecord, ModelId extends Array<string | number>>
  extends Omit<SelectMultipleProps<ModelId>, 'options' | 'onChange'> {
  service: () => Promise<Model[]> | Model[];
  transformToOption: (model: Model, index?: number) => OptionRawDataWithSearchValue<Model>;
  onChange?: (value: ModelId | undefined, option: OptionWithRawData<Model>[] | undefined) => void;
  depsFetch?: DependencyList;
  depsTransformOption?: DependencyList;
}

export const SelectMultipleDecoupling = <Model extends AnyRecord, ModelId extends Array<string | number>>({
  transformToOption,
  service,
  onChange,
  loading,
  showSearch = true,
  depsFetch = [],
  depsTransformOption = [],
  ...props
}: SelectMultipleDecouplingProps<Model, ModelId>) => {
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [response, setResponse] = useState<Model[]>([]);

  const handleFetch = async () => {
    setIsFetching(true);
    try {
      const items = await service();
      setResponse(items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...depsFetch]);

  useEffect(() => {
    const transformData = response?.map((item, index) => ({ ...transformToOption(item, index), rawData: item })) ?? [];
    setOptions(transformData);
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, ...depsTransformOption]);

  return (
    <SelectMultiple
      {...props}
      showSearch={showSearch}
      onChange={onChange}
      options={options}
      loading={loading || isFetching}
    />
  );
};
