import { ToRequiredKeys } from 'typescript-utilities';
import { OptionWithRawData } from './OptionWithRawData';

export type OptionRawDataWithSearchValue<Model> = ToRequiredKeys<OptionWithRawData<Model>, 'searchValue'>;
