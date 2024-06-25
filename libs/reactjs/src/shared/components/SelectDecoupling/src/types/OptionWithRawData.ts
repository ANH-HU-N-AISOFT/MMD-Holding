import { SelectOption } from '../../../AntCustom';
import { ModelIdType } from './ModelIdType';

export type OptionWithRawData<Model, ModelId extends ModelIdType> = Omit<
  SelectOption<ModelId, Model>,
  'searchValue'
> & {
  rawData: Model;
};
