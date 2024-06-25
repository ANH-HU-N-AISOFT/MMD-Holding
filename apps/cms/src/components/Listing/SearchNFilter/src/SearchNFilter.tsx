import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { Input } from 'reactjs';
import { FilterDrawer } from '../../../FilterDrawer';

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
    hideFilter?: boolean;
  };
  isSubmiting?: boolean;
  containerClassName?: string;
  inputClassName?: string;
}

export const SearchNFilter = ({
  filter,
  search,
  isSubmiting,
  containerClassName,
  inputClassName,
}: SearchNFilterProps) => {
  const { placeholder, onSearch, searchValue } = search;
  const { uid, count, form, onApply, onReset, hideFilter } = filter;

  return (
    <div className={classNames('flex gap-2', containerClassName)}>
      <Input
        allowClear
        value={searchValue}
        className={classNames('md:max-w-[350px] flex-1', inputClassName)}
        placeholder={placeholder}
        suffix={<SearchOutlined />}
        onDebounceChange={value => onSearch?.(value ?? '')}
      />
      <FilterDrawer
        containerClassName={classNames('flex-shrink-0 flex-grow-0 basis-[48px]', hideFilter ? '!hidden' : '')}
        isLoading={isSubmiting}
        count={count}
        formId={uid}
        onReset={onReset}
        onApply={onApply}
      >
        {form}
      </FilterDrawer>
    </div>
  );
};
