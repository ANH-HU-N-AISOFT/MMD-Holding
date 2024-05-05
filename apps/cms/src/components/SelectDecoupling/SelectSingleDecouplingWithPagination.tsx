import { Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedValue } from 'reactjs';
import { AnyRecord } from 'typescript-utilities';
import { SelectSingle, SelectSingleProps } from '../AntCustom/Select';
import { OptionWithRawData } from './types/OptionWithRawData';

interface ExpectServiceResponse<Model extends AnyRecord> {
  items: Model[];
  loadmorable: boolean;
}

export interface SelectSingleDecouplingWithPaginationProps<Model extends AnyRecord, ModelId extends string | number>
  extends Omit<SelectSingleProps<ModelId>, 'options' | 'onChange'> {
  service: (params: {
    page: number;
    search: string;
  }) => Promise<ExpectServiceResponse<Model>> | ExpectServiceResponse<Model>;
  transformToOption: (model: Model, index?: number) => OptionWithRawData<Model>;
  onChange?: (value: ModelId | undefined, option: OptionWithRawData<Model> | undefined) => void;
}

export const SelectSingleDecouplingWithPagination = <Model extends AnyRecord, ModelId extends string | number>({
  transformToOption,
  service,
  onChange,
  loading,
  showSearch = true,
  ...props
}: SelectSingleDecouplingWithPaginationProps<Model, ModelId>) => {
  const cache = useRef<Record<string, ExpectServiceResponse<Model>>>({});

  const [isMounted, setIsMounted] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [loadmoreable, setLoadmorable] = useState(false);
  const [options, setOptions] = useState<OptionWithRawData<Model>[]>([]);

  const { state: debouncedSearchValue, overridesState: overridesDebouncedSearchValue } = useDebouncedValue(
    searchValue,
    { timeoutMs: 300 },
  );
  const { state: debouncedPage, overridesState: overridesDebouncedPage } = useDebouncedValue(page, { timeoutMs: 300 });

  const handleFetch =
    (variant: 'FETCH' | 'LOAD_MORE'): SelectSingleDecouplingWithPaginationProps<Model, ModelId>['service'] =>
    async ({ page, search }) => {
      const keyInCache = [page, search].join(' - ');
      const cacheValue = cache.current[keyInCache];
      const response = cacheValue ? cacheValue : await service({ page, search });
      cache.current[keyInCache] = response;
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
      await loadmore({ page, search: searchValue });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSearchDropdown: SelectSingleProps<ModelId>['onSearch'] = search => {
    setIsFetching(true);
    setIsLoadingMore(false);
    setPage(1);
    setSearchValue(search);
  };

  const handleScroll: SelectSingleProps<ModelId>['onPopupScroll'] = event => {
    if (isLoadingMore || isFetching || !loadmoreable) {
      return;
    }
    const dropdownEl = event.target as HTMLElement;
    if (dropdownEl.scrollTop + dropdownEl.offsetHeight >= dropdownEl.scrollHeight - 100) {
      setIsLoadingMore(true);
      setPage(state => state + 1);
    }
  };

  const handleChange: SelectSingleProps<ModelId>['onChange'] = (value, option) => {
    onChange?.(value, option);
    overridesDebouncedPage(1);
    overridesDebouncedSearchValue('');
    setSearchValue('');
    setPage(1);
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
    <SelectSingle<ModelId, Model>
      {...props}
      filterOption={() => true}
      showSearch={showSearch}
      searchValue={searchValue}
      onSearch={handleSearchDropdown}
      onPopupScroll={handleScroll}
      onChange={handleChange}
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
                rawData: undefined as any,
              },
            ]
          : options
      }
      loading={loading || isFetching}
    />
  );
};
