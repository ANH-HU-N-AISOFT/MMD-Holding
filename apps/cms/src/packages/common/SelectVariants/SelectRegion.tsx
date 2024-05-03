import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Option, SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { Country } from '~/packages/specific/Location/models/Location';
import { getCountries } from '~/packages/specific/Location/services/getCountries';

interface Props {
  region?: Country['id'];
  onChange?: SelectSingleProps<Country['id'], Country>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
}

export const SelectRegion = ({ region, disabled, allowClear = true, onChange }: Props) => {
  const { t } = useTranslation(['location']);
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const handleFetchOption = async () => {
    setIsFetching(true);
    try {
      const response = await getCountries({});
      setOptions(
        response.items.map(item => ({
          label: item.name,
          value: item.name,
          searchValue: item.name,
          rawData: item,
        })),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    handleFetchOption();
  }, []);

  return (
    <SelectSingle
      allowClear={allowClear}
      value={region}
      onChange={onChange}
      disabled={disabled}
      placeholder={t('location:region')}
      className="w-full"
      loading={isFetching}
      showSearch
      searchValue={searchValue}
      options={options}
      onSearch={value => setSearchValue(value)}
    />
  );
};
