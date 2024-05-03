import { OptionWithRawData } from './OptionWithRawData';

export type OptionRawDataWithSearchValue<Model> = OptionWithRawData<Model> & { searchValue: string };
