import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'reactjs';
import { SelectOption, SelectSingle, SelectSingleProps } from 'reactjs';
import { GetAllParams } from '~/constants/GetAllParams';
import { TestShift } from '~/packages/specific/Appointment/models/TestShift';
import { getTestShifts } from '~/packages/specific/Appointment/services/getTestShifts';

interface Props {
  testShift?: TestShift['id'];
  onChange?: SelectSingleProps<TestShift['id'], TestShift>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  appointmentDate: 'GET_ALL' | string | undefined;
  testOrganizationId: 'GET_ALL' | string | undefined;
  placeholder?: string;
}

export const SelectTestShift = ({
  testShift,
  disabled,
  allowClear = true,
  appointmentDate,
  testOrganizationId,
  placeholder,
  onChange,
}: Props) => {
  const { t } = useTranslation(['appointment']);
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<SelectOption<TestShift['id']>[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const needWarning = useMemo(() => !appointmentDate || !testOrganizationId, [appointmentDate, testOrganizationId]);

  const handleFetchOption = async () => {
    setIsFetching(true);
    try {
      if (appointmentDate && testOrganizationId) {
        const response = await getTestShifts({
          ...GetAllParams,
          appointmentDate: appointmentDate === 'GET_ALL' ? undefined : appointmentDate,
          testOrganizationId: testOrganizationId === 'GET_ALL' ? undefined : testOrganizationId,
        });
        setOptions(
          response.map(item => ({
            label: (
              <div className="flex items-center justify-between gap-2">
                <div>{item.name}</div>
                <div className={disabled ? 'hidden' : 'block'}>
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
  }, [appointmentDate, testOrganizationId]);

  return (
    <SelectSingle
      notFoundContent={
        needWarning ? (
          <Empty
            description={
              !appointmentDate
                ? t('appointment:must_select_appointment_date')
                : !testOrganizationId
                  ? t('appointment:must_select_expect_inspection_department')
                  : ''
            }
          />
        ) : undefined
      }
      allowClear={allowClear}
      value={testShift}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder ?? t('appointment:test_shift')}
      className="w-full"
      loading={isFetching}
      searchValue={searchValue}
      options={options}
      onSearch={value => setSearchValue(value)}
    />
  );
};
