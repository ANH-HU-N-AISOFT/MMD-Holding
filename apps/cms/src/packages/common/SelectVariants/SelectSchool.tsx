import { Empty } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Option, SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { GetAllParams } from '~/constants/GetAllParams';
import { School } from '~/packages/specific/Location/models/Location';
import { getSchools } from '~/packages/specific/Location/services/getSchools';

interface Props {
  school?: School['id'];
  onChange?: SelectSingleProps<School['id'], School>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  cityCode: string | undefined;
}

export const SelectSchool = ({ school, disabled, allowClear = true, cityCode, onChange }: Props) => {
  const { t } = useTranslation(['location']);
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const needWarning = useMemo(() => !cityCode, [cityCode]);

  const handleFetchOption = async () => {
    setIsFetching(true);
    try {
      if (cityCode) {
        const response = await getSchools({
          ...GetAllParams,
          provinceCode: cityCode,
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
      placeholder={t('location:school')}
      className="w-full"
      loading={isFetching}
      showSearch
      searchValue={searchValue}
      options={options}
      onSearch={value => setSearchValue(value)}
    />
  );
};
