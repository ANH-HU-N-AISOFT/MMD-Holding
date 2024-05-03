import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Option, SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { City } from '~/packages/specific/Location/models/Location';
import { getCities } from '~/packages/specific/Location/services/getCities';

interface Props {
  city?: City['id'];
  onChange?: SelectSingleProps<City['id'], City>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  fieldKey?: keyof City;
}

export const SelectCity = ({ city, disabled, allowClear = true, onChange, fieldKey = 'id' }: Props) => {
  const { t } = useTranslation(['location']);
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const handleFetchOption = async () => {
    setIsFetching(true);
    try {
      const response = await getCities({});
      setOptions(
        response.items.map(item => ({
          label: item.name,
          value: item[fieldKey],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SelectSingle
      allowClear={allowClear}
      value={city}
      onChange={onChange}
      disabled={disabled}
      placeholder={t('location:city')}
      className="w-full"
      loading={isFetching}
      showSearch
      searchValue={searchValue}
      options={options}
      onSearch={value => setSearchValue(value)}
    />
  );
};
