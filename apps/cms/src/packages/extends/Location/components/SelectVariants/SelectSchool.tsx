import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'reactjs';
import { SelectOption, SelectSingle, SelectSingleProps } from 'reactjs';
import { GetAllParams } from '~/constants/GetAllParams';
import { School } from '~/packages/extends/Location/models/Location';
import { getSchools } from '~/packages/extends/Location/services/getSchools';

interface Props {
  school?: School['id'];
  onChange?: SelectSingleProps<School['id'], School>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  cityCode: 'GET_ALL' | string | undefined;
  placeholder?: ReactNode;
}

export const SelectSchool = ({ school, disabled, allowClear = true, cityCode, onChange, placeholder }: Props) => {
  const { t } = useTranslation(['location']);
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<SelectOption<School['id']>[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const needWarning = useMemo(() => !cityCode, [cityCode]);

  const handleFetchOption = async () => {
    setIsFetching(true);
    try {
      if (cityCode) {
        const response = await getSchools({
          ...GetAllParams,
          provinceCode: cityCode === 'GET_ALL' ? undefined : cityCode,
        });
        setOptions(
          response.items.map(item => ({
            label: item.name,
            value: item.id,
            searchValue: item.name,
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
