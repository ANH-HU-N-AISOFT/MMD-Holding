import { Option } from '~/components/AntCustom/Select';

export type OptionWithRawData<Model> = Option<Model> & { rawData: Model };
