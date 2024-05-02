import { Empty } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Option, SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { District } from '~/packages/specific/Location/models/Location';
import { getDistricts } from '~/packages/specific/Location/services/getDistricts';

interface Props {
  district?: District['id'];
  onChange?: SelectSingleProps<District['id'], District>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  cityCode: string | undefined;
}

export const SelectDistrict = ({ district, disabled, allowClear = true, cityCode, onChange }: Props) => {
  const { t } = useTranslation(['location']);
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const needWarning = useMemo(() => !cityCode, [cityCode]);

  const handleFetchOption = async () => {
    setIsFetching(true);
    try {
      if (cityCode) {
        const response = await getDistricts({
          provinceCode: cityCode,
        });
        setOptions(
          response.items.map(item => ({
            label: item.name,
            value: item.name,
            rawData: item,
          })),
        );
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    handleFetchOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityCode]);

  return (
    <SelectSingle
      notFoundContent={needWarning ? <Empty description={t('location:must_select_city')} /> : undefined}
      allowClear={allowClear}
      value={district}
      onChange={onChange}
      disabled={disabled}
      placeholder={t('location:district')}
      className="w-full"
      loading={isFetching}
      showSearch
      searchValue={searchValue}
      options={options}
      onSearch={value => setSearchValue(value)}
    />
  );
};
