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
  deps?: DependencyList;
}

export const SelectMultipleDecouplingWithPagination = <
  Model extends AnyRecord,
  ModelId extends Array<string | number>,
>({
  transformToOption,
  service,
  onChange,
  loading,
  showSearch = true,
  ...props
}: SelectMultipleDecouplingProps<Model, ModelId>) => {
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

  const handleFetch = async () => {
    setIsFetching(true);
    try {
      const items = await service();
      const transformData = items?.map((item, index) => ({ ...transformToOption(item, index), rawData: item })) ?? [];
      setOptions(transformData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SelectMultiple
      {...props}
      filterOption={() => true}
      showSearch={showSearch}
      onChange={onChange}
      options={options}
      loading={loading || isFetching}
    />
  );
};
