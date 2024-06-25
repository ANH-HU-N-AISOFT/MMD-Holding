import { ModelIdType } from './ModelIdType';
import { OptionWithRawData } from './OptionWithRawData';

export type OptionRawDataWithSearchValue<Model, ModelId extends ModelIdType> = OptionWithRawData<Model, ModelId> & {
  searchValue: string;
};
