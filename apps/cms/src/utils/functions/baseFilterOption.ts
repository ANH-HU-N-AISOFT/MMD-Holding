import { SelectMultipleProps, SelectSingleProps } from '~/components/AntCustom/Select';

type FilterOption = (SelectSingleProps<any> | SelectMultipleProps<any>)['filterOption'];
export const baseFilterOption: FilterOption = (input, option) => {
  if (option?.searchValue) {
    return !!option?.searchValue?.toLowerCase().replace(/\s/g, '').includes(input.toLowerCase().replace(/\s/g, ''));
  }
  return !!option?.value.toString().includes(input.toString());
};
