import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from 'reactjs';
import { AnyRecord } from 'typescript-utilities';
import { Option, SelectMultiple, SelectMultipleProps } from '../AntCustom/Select';

type OptionWithRawData<Model> = Option & { rawData: Model };

interface ExpectServiceResponse<Model extends AnyRecord> {
  items: Model[];
  loadmorable: boolean;
}

export interface SelectMultipleDecouplingProps<Model extends AnyRecord, ModelId extends Array<string | number>>
  extends Omit<SelectMultipleProps<ModelId>, 'options' | 'onChange'> {
  service: (params: {
    page: number;
    search: string;
  }) => Promise<ExpectServiceResponse<Model>> | ExpectServiceResponse<Model>;
  transformToOption: (model: Model, index?: number) => Option;
  onChange?: (value: ModelId | undefined, option: OptionWithRawData<Model> | undefined) => void;
}

export const SelectMultipleDecoupling = <Model extends AnyRecord, ModelId extends Array<string | number>>({
  transformToOption,
  service,
  onChange,
  loading,
  showSearch = true,
  ...props
}: SelectMultipleDecouplingProps<Model, ModelId>) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [loadmoreable, setLoadmorable] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

  const debouncedSearchValue = useDebouncedValue(searchValue, { timeoutMs: 300 });
  const debouncedPage = useDebouncedValue(page, { timeoutMs: 300 });

  const handleFetch =
    (variant: 'FETCH' | 'LOAD_MORE'): SelectMultipleDecouplingProps<Model, ModelId>['service'] =>
    async ({ page, search }) => {
      const response = await service({ page, search });
      const { items, loadmorable } = response;
      const transformData = items?.map((item, index) => ({ ...transformToOption(item, index), rawData: item })) ?? [];
      setOptions(state => (variant === 'FETCH' ? transformData : state.concat(transformData)));
      setLoadmorable(loadmorable);
      return response;
    };

  const handleFetchOption = async (search: string) => {
    try {
      const fetch = handleFetch('FETCH');
      await fetch({ page: 1, search });
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleLoadmoreOption = async (page: number) => {
    setIsLoadingMore(true);
    try {
      const loadmore = handleFetch('LOAD_MORE');
      await loadmore({ page: page + 1, search: searchValue });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSearchDropdown: SelectMultipleProps<ModelId>['onSearch'] = search => {
    setIsFetching(true);
    setIsLoadingMore(false);
    setPage(1);
    setSearchValue(search);
  };

  const handleScroll: SelectMultipleProps<ModelId>['onPopupScroll'] = event => {
    if (isLoadingMore || isFetching || !loadmoreable) {
      return;
    }
    const dropdownEl = event.target as HTMLElement;
    if (dropdownEl.scrollTop + dropdownEl.offsetHeight >= dropdownEl.scrollHeight - 100) {
      const nextPage = page + 1;
      setIsLoadingMore(true);
      setPage(nextPage);
    }
  };

  useEffect(() => {
    if (isMounted) {
      handleFetchOption(debouncedSearchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (isMounted) {
      handleLoadmoreOption(debouncedPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPage]);

  useEffect(() => {
    const fetch = handleFetch('FETCH');
    setIsMounted(true);
    fetch({ page: 1, search: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SelectMultiple
      {...props}
      filterOption={() => true}
      showSearch={showSearch}
      searchValue={searchValue}
      onSearch={handleSearchDropdown}
      onPopupScroll={handleScroll}
      onChange={onChange as any}
      options={
        loadmoreable
          ? [
              ...options,
              {
                label: (
                  <div className="flex justify-center">
                    <Spin />
                  </div>
                ),
                value: '',
                disabled: true,
              },
            ]
          : options
      }
      loading={loading || isFetching}
    />
  );
};
