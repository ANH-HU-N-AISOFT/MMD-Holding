import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectOption, SelectSingle, SelectSingleProps } from 'reactjs';
import { GetAllParams } from '~/constants/GetAllParams';
import { City } from '~/packages/extends/Location/models/Location';
import { getCities } from '~/packages/extends/Location/services/getCities';

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
  const [options, setOptions] = useState<SelectOption<City['id']>[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const handleFetchOption = async () => {
    setIsFetching(true);
    try {
      const response = await getCities({
        ...GetAllParams,
      });
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
      searchValue={searchValue}
      options={options}
      onSearch={value => setSearchValue(value)}
    />
  );
};
