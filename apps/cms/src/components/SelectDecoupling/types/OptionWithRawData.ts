import { Option } from '~/components/AntCustom/Select';

export type OptionWithRawData<Model> = Option & { rawData: Model };
