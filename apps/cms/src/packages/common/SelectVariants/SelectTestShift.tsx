import { Empty } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Option, SelectSingle, SelectSingleProps } from '~/components/AntCustom/Select';
import { GetAllParams } from '~/constants/GetAllParams';
import { TestShift } from '~/packages/specific/Appointment/models/TestShift';
import { getTestShifts } from '~/packages/specific/Appointment/services/getTestShifts';

interface Props {
  testShift?: TestShift['id'];
  onChange?: SelectSingleProps<TestShift['id'], TestShift>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  appointmentDate: 'GET_ALL' | string | undefined;
  placeholder?: string;
}

export const SelectTestShift = ({
  testShift,
  disabled,
  allowClear = true,
  appointmentDate,
  placeholder,
  onChange,
}: Props) => {
  const { t } = useTranslation(['appointment']);
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const needWarning = useMemo(() => !appointmentDate, [appointmentDate]);

  const handleFetchOption = async () => {
    setIsFetching(true);
    try {
      if (appointmentDate) {
        const response = await getTestShifts({
          ...GetAllParams,
          appointmentDate: appointmentDate === 'GET_ALL' ? undefined : appointmentDate,
        });
        setOptions(
          response.map(item => ({
            label: (
              <div className="flex items-center gap-2 justify-between">
                <div>{item.name}</div>
                <div>
                  {t('appointment:total_available')}: {item.maxCapacity - item.totalAppointments}
                </div>
              </div>
            ),
            value: item.id,
            searchValue: item.name,
            rawData: item,
            disabled: item.maxCapacity - item.totalAppointments <= 0,
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
  }, [appointmentDate]);

  return (
    <SelectSingle
      notFoundContent={needWarning ? <Empty description={t('appointment:must_select_appointment_date')} /> : undefined}
      allowClear={allowClear}
      value={testShift}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder ?? t('appointment:test_shift')}
      className="w-full"
      loading={isFetching}
      showSearch
      searchValue={searchValue}
      options={options}
      onSearch={value => setSearchValue(value)}
    />
  );
};
