import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty, SelectOption, SelectSingle, SelectSingleProps } from 'reactjs';
import { School } from '../../models/Location';
import { ResponseSuccess, getSchools } from '../../services/getSchools';
import { GetAllParams } from '~/constants/GetAllParams';

interface SelectSchoolOfCityProps {
  scope: 'inACity';
  cityCode: string | undefined;
}

interface SelectAllSchoolProps {
  scope: 'allSystem';
  cityCode?: undefined;
}

type Props = (SelectSchoolOfCityProps | SelectAllSchoolProps) & {
  school: School['id'] | undefined;
  onChange: SelectSingleProps<School['id'], School>['onChange'] | undefined;
  disabled: boolean;
  allowClear?: boolean;
  placeholder?: string;
};

export const SelectSchool = ({
  school,
  disabled,
  allowClear = true,
  cityCode,
  onChange,
  placeholder,
  scope,
}: Props) => {
  const { t } = useTranslation(['location']);
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<SelectOption<School['id']>[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const needWarning = useMemo(() => !cityCode, [cityCode]);

  const handleFetchOption = async () => {
    setIsFetching(true);
    try {
      let response: ResponseSuccess | undefined;
      if (scope === 'allSystem') {
        response = await getSchools({ ...GetAllParams });
      }
      if (scope === 'inACity') {
        if (cityCode) {
          response = await getSchools({
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
  }, [cityCode]);

  return (
    <SelectSingle
      notFoundContent={needWarning ? <Empty description={t('location:must_select_city')} /> : undefined}
      allowClear={allowClear}
      value={school}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder ?? t('location:school')}
      className="w-full"
      loading={isFetching}
      searchValue={searchValue}
      options={options}
      onSearch={value => setSearchValue(value)}
    />
  );
};
