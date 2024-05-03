import { useEffect, useState } from 'react';
import { AnyRecord } from 'typescript-utilities';
import { SelectSingle, SelectSingleProps } from '../AntCustom/Select';
import { OptionRawDataWithSearchValue } from './types/OptionRawDataWithSearchValue';
import { OptionWithRawData } from './types/OptionWithRawData';

export interface SelectSingleDecouplingProps<Model extends AnyRecord, ModelId extends string | number>
  extends Omit<SelectSingleProps<ModelId>, 'options' | 'onChange'> {
  service: () => Promise<Model[]> | Model[];
  transformToOption: (model: Model, index?: number) => OptionRawDataWithSearchValue<Model>;
  onChange?: (value: ModelId | undefined, option: OptionWithRawData<Model> | undefined) => void;
}

export const SelectSingleDecoupling = <Model extends AnyRecord, ModelId extends string | number>({
  transformToOption,
  service,
  onChange,
  loading,
  showSearch = true,
  ...props
}: SelectSingleDecouplingProps<Model, ModelId>) => {
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<OptionWithRawData<Model>[]>([]);

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
    <SelectSingle<ModelId, Model>
      {...props}
      showSearch={showSearch}
      onChange={onChange}
      options={options}
      loading={loading || isFetching}
    />
  );
};
