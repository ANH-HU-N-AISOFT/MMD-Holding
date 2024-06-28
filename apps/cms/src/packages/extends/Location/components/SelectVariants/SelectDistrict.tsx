import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'reactjs';
import { SelectOption, SelectSingle, SelectSingleProps } from 'reactjs';
import { District } from '../../models/Location';
import { ResponseSuccess, getDistricts } from '../../services/getDistricts';
import { GetAllParams } from '~/constants/GetAllParams';

interface SelectDistrictOfCityProps {
  scope: 'inACity';
  cityCode: string | undefined;
}

interface SelectAllDistrictProps {
  scope: 'allSystem';
  cityCode?: undefined;
}

type Props = (SelectDistrictOfCityProps | SelectAllDistrictProps) & {
  district: District['id'] | undefined;
  onChange: SelectSingleProps<District['id'], District>['onChange'] | undefined;
  disabled: boolean;
  allowClear?: boolean;
};

export const SelectDistrict = ({ district, disabled, allowClear = true, cityCode, scope, onChange }: Props) => {
  const { t } = useTranslation(['location']);
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<SelectOption<District['id']>[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const needWarning = useMemo(() => !cityCode, [cityCode]);

  const handleFetchOption = async () => {
    setIsFetching(true);
    try {
      let response: ResponseSuccess | undefined;
      if (scope === 'allSystem') {
        response = await getDistricts({ ...GetAllParams });
      }
      if (scope === 'inACity') {
        if (cityCode) {
          response = await getDistricts({
            ...GetAllParams,
            provinceCode: cityCode,
          });
        }
      }
      setOptions(
        (response?.items ?? []).map(item => ({
          label: item.name,
          value: item.id,
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
  }, [cityCode, scope]);

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
      searchValue={searchValue}
      options={options}
      onSearch={value => setSearchValue(value)}
    />
  );
};
