import { zodResolver } from '@hookform/resolvers/zod';
import { Select, Tabs } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect, useMobile } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { DatePicker } from '~/components/AntCustom/DatePicker/DatePicker';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/@base/utils/getCountForFilterDrawer';
import { AppointmentStatus } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatus';
import { getAppointmentStatusMappingToLabels } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatusMappingToLabels';
import { SelectAppointmentStatus } from '~/packages/common/SelectVariants/AppointmentStatus/SelectAppointmentStatus';
import { IeltsTestEnum } from '~/packages/common/SelectVariants/IeltsTestEnum/constants/IeltsTestEnum';
import { SelectIeltsTestEnum } from '~/packages/common/SelectVariants/IeltsTestEnum/SelectIeltsTestEnum';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import './styles.css';

export interface FormFilterValues
  extends Pick<ListingSearchParams, 'status' | 'organizationId' | 'date' | 'test' | 'testShiftId'> {}

interface FormFilterProps {
  onFilter?: (formFilterValues: FormFilterValues) => void;
  onResetFilter?: () => void;
  isSubmiting?: boolean;
  formFilterValues?: FormFilterValues;
  searchValue?: string;
  onSearch?: (value: string) => void;
  containerClassName?: string;
}

const UID = 'FORM_FILTER_LISTING_CUSTOMER_MANAGEMENT';
export const FormSearchNFilter = ({
  formFilterValues = {},
  searchValue,
  onSearch,
  isSubmiting,
  onResetFilter,
  onFilter,
  containerClassName,
}: FormFilterProps) => {
  const { t } = useTranslation(['common', 'appointment', 'enum']);
  const { isMobile } = useMobile();

  const AppointmentStatusMappingToLabel = useMemo(() => {
    return getAppointmentStatusMappingToLabels(t);
  }, [t]);

  const { handleSubmit, reset, watch, setValue } = useRemixForm<FormFilterValues>({
    mode: 'onSubmit',
    defaultValues: formFilterValues,
    resolver: zodResolver(lisitngUrlSearchParamsSchema),
    submitHandlers: {
      onValid: onFilter,
    },
  });
  const status = watch('status');
  const date = watch('date');
  const test = watch('test');
  const organizationId = watch('organizationId');

  const handleResetFormFilterValues = () => {
    reset({});
    onResetFilter?.();
  };

  useDeepCompareEffect(() => {
    reset(formFilterValues);
  }, [formFilterValues]);

  return (
    <div
      className={classNames(
        'flex flex-wrap gap-1',
        isMobile ? 'flex-col-reverse' : 'flex-row items-center justify-between flex-wrap-reverse',
      )}
    >
      <div className="max-w-full lg:max-w-[45%] xl:max-w-[initial]">
        <Tabs
          activeKey={status}
          onChange={value => {
            setValue('status', value as FormFilterValues['status']);
            handleSubmit();
          }}
          className="Appointment__type flex-1"
          items={[
            { key: 'all', label: t('enum:appointmentStatus.options.all') },
            {
              key: AppointmentStatus.SCHEDULED,
              label: AppointmentStatusMappingToLabel[AppointmentStatus.SCHEDULED],
            },
            {
              key: AppointmentStatus.CONFIRMED,
              label: AppointmentStatusMappingToLabel[AppointmentStatus.CONFIRMED],
            },
            {
              key: AppointmentStatus.ARRIVED_AT_CENTER,
              label: AppointmentStatusMappingToLabel[AppointmentStatus.ARRIVED_AT_CENTER],
            },
            {
              key: AppointmentStatus.LEVEL_TESTED,
              label: AppointmentStatusMappingToLabel[AppointmentStatus.LEVEL_TESTED],
            },
            {
              key: AppointmentStatus.CANCELED,
              label: AppointmentStatusMappingToLabel[AppointmentStatus.CANCELED],
            },
          ]}
        />
      </div>
      <SearchNFilter
        containerClassName={classNames(
          'mb-0 flex-shrink-0 sm:min-w-[380px] lg:basis-[52%] xl:basis-[37%] 2xl:basis-[600px] !justify-start w-full',
          containerClassName,
        )}
        inputClassName="md:!max-w-[initial]"
        isSubmiting={isSubmiting}
        search={{
          placeholder: t('appointment:search_placeholder'),
          searchValue: searchValue,
          onSearch: onSearch,
        }}
        filter={{
          uid: UID,
          onReset: handleResetFormFilterValues,
          count: getCountForFilterDrawer({
            fieldKeys: ['organizationId', 'date', 'test', 'testShiftId'],
            formFilterValues,
          }),
          form: (
            <Form method="GET" id={UID} onSubmit={handleSubmit}>
              <Field label={t('appointment:status')}>
                <SelectAppointmentStatus
                  allowClear={false}
                  placeholder={t('appointment:status')}
                  withAllOption
                  appointmentStatus={status ?? 'all'}
                  onChange={value => setValue('status', value)}
                />
              </Field>
              <Field label={t('appointment:appointment_date')}>
                <DatePicker
                  className="w-full"
                  placeholder={t('appointment:appointment_date')}
                  value={date ? dayjs(date) : undefined}
                  onChange={value => setValue('date', value?.toISOString())}
                />
              </Field>
              <Field label={t('appointment:test_shift')}>
                <Select className="w-full" placeholder={t('appointment:test_shift')} />
              </Field>
              <Field label={t('appointment:test')}>
                <SelectIeltsTestEnum
                  ieltsTest={test as IeltsTestEnum | undefined}
                  onChange={value => setValue('test', value)}
                />
              </Field>
              <Field label={t('appointment:expect_inspection_department')}>
                <SelectDepartment
                  placeholder={t('appointment:expect_inspection_department')}
                  department={organizationId}
                  onChange={value => setValue('organizationId', value)}
                />
              </Field>
            </Form>
          ),
        }}
      />
    </div>
  );
};
