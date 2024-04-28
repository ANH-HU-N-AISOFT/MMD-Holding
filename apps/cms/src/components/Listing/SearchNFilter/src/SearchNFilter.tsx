import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ChangeEvent, ReactNode } from 'react';
import { FilterDrawer } from '../../../FilterDrawer';
import { debounce } from '~/utils/functions/debounce';

export interface SearchNFilterProps {
  search: {
    placeholder: string;
    searchValue?: string;
    onSearch?: (value: string) => void;
  };
  filter: {
    uid: string;
    count: number;
    onReset?: () => void;
    onApply?: () => void;
    form: ReactNode;
  };
  isSubmiting?: boolean;
}

export const SearchNFilter = ({ filter, search, isSubmiting }: SearchNFilterProps) => {
  const { placeholder, onSearch, searchValue } = search;
  const { uid, count, form, onApply, onReset } = filter;

  return (
    <div className="flex flex-col xs:flex-row sm:justify-end mb-1 gap-2">
      <Input
        defaultValue={searchValue}
        className="md:max-w-[350px]"
        placeholder={placeholder}
        size="large"
        suffix={<SearchOutlined />}
        onChange={debounce((event: ChangeEvent<HTMLInputElement>) => {
          onSearch?.(event.target.value);
        })}
      />
      <FilterDrawer isLoading={isSubmiting} count={count} formId={uid} onReset={onReset} onApply={onApply}>
        {form}
      </FilterDrawer>
    </div>
  );
};
