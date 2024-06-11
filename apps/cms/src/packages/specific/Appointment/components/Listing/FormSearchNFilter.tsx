import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs } from 'antd';
import classNames from 'classnames';
import { sum, values } from 'ramda';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect, useMobile } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SelectSingle } from '~/components/AntCustom/Select';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/@base/utils/getCountForFilterDrawer';
import { AppointmentStatus } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatus';
import { getAppointmentStatusMappingToLabels } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatusMappingToLabels';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import './styles.css';

export interface FormFilterValues
  extends Pick<ListingSearchParams, 'status' | 'organizationId' | 'date' | 'test' | 'testShiftId' | 'isOwner'> {}

interface FormFilterProps {
  onFilter?: (formFilterValues: FormFilterValues) => void;
  onResetFilter?: () => void;
  isSubmiting?: boolean;
  formFilterValues?: FormFilterValues;
  searchValue?: string;
  onSearch?: (value: string) => void;
  containerClassName?: string;
  counts?: Record<AppointmentStatus, number>;
  hideFilter?: boolean;
}

const UID = 'FORM_FILTER_LISTING_APPOINTMENT';
export const FormSearchNFilter = ({
  formFilterValues = {},
  searchValue,
  onSearch,
  isSubmiting,
  onResetFilter,
  onFilter,
  containerClassName,
  counts,
  hideFilter,
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
  const isOwner = watch('isOwner') ?? false;
  // const date = watch('date');
  // const test = watch('test');
  const organizationId = watch('organizationId');

  const handleResetFormFilterValues = () => {
    reset({});
    onResetFilter?.();
  };

  useDeepCompareEffect(() => {
    reset(formFilterValues);
  }, [formFilterValues]);

  if (hideFilter) {
    return (
      <SearchNFilter
        inputClassName="md:!max-w-[600px]"
        containerClassName={classNames(containerClassName)}
        isSubmiting={isSubmiting}
        search={{
          placeholder: t('appointment:search_placeholder'),
          searchValue: searchValue,
          onSearch: onSearch,
        }}
        filter={{
          hideFilter: hideFilter,
          uid: UID,
          onReset: handleResetFormFilterValues,
          count: getCountForFilterDrawer({
            fieldKeys: ['organizationId', 'isOwner'],
            formFilterValues,
          }),
          form: (
            <Form method="GET" id={UID} onSubmit={handleSubmit}>
              <Field label={t('appointment:owner')}>
                <SelectSingle
                  options={[
                    { label: t('appointment:all'), value: 0, rawData: undefined },
                    { label: t('appointment:me'), value: 1, rawData: undefined },
                  ]}
                  value={Number(isOwner)}
                  onChange={value => setValue('isOwner', Boolean(value))}
                />
              </Field>
              {/* <Field label={t('appointment:status')}>
              <SelectAppointmentStatus
                allowClear={false}
                placeholder={t('appointment:status')}
                withAllOption
                appointmentStatus={status ?? 'all'}
                onChange={value => setValue('status', value)}
              />
            </Field> */}
              {/* <Field label={t('appointment:appointment_date')}>
              <DatePicker
                className="w-full"
                placeholder={t('appointment:appointment_date')}
                value={date ? dayjs(date) : undefined}
                onChange={value => setValue('date', value?.toISOString())}
              />
            </Field> */}
              {/* <Field label={t('appointment:test_shift')}>
              <Select className="w-full" placeholder={t('appointment:test_shift')} />
            </Field>
            <Field label={t('appointment:test')}>
              <SelectIeltsTestEnum
                ieltsTest={test as IeltsTestEnum | undefined}
                onChange={value => setValue('test', value)}
              />
            </Field> */}
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
    );
  }

  return (
    <div
      className={classNames(
        'flex flex-wrap gap-1',
        isMobile ? 'flex-col-reverse' : 'flex-row items-center justify-between flex-wrap-reverse',
      )}
    >
      <div className="max-w-full lg:max-w-[45%] xl:max-w-[49%]">
        <Tabs
          size="small"
          tabBarGutter={16}
          activeKey={status}
          onChange={value => {
            setValue('status', value as FormFilterValues['status']);
            handleSubmit();
          }}
          className="Appointment__type flex-1"
          items={[
            {
              key: 'all',
              label: (
                <div>
                  {t('enum:appointmentStatus.options.all')} {counts ? `(${sum(values(counts))})` : null}
                </div>
              ),
            },
            {
              key: AppointmentStatus.SCHEDULED,
              label: (
                <div>
                  {AppointmentStatusMappingToLabel[AppointmentStatus.SCHEDULED]}{' '}
                  {typeof counts?.[AppointmentStatus.SCHEDULED] === 'number'
                    ? `(${counts?.[AppointmentStatus.SCHEDULED]})`
                    : null}
                </div>
              ),
            },
            {
              key: AppointmentStatus.CONFIRMED,
              label: (
                <div>
                  {AppointmentStatusMappingToLabel[AppointmentStatus.CONFIRMED]}{' '}
                  {typeof counts?.[AppointmentStatus.CONFIRMED] === 'number'
                    ? `(${counts?.[AppointmentStatus.CONFIRMED]})`
                    : null}
                </div>
              ),
            },
            {
              key: AppointmentStatus.ARRIVED_AT_CENTER,
              label: (
                <div>
                  {AppointmentStatusMappingToLabel[AppointmentStatus.ARRIVED_AT_CENTER]}{' '}
                  {typeof counts?.[AppointmentStatus.ARRIVED_AT_CENTER] === 'number'
                    ? `(${counts?.[AppointmentStatus.ARRIVED_AT_CENTER]})`
                    : null}
                </div>
              ),
            },
            {
              key: AppointmentStatus.LEVEL_TESTED,
              label: (
                <div>
                  {AppointmentStatusMappingToLabel[AppointmentStatus.LEVEL_TESTED]}{' '}
                  {typeof counts?.[AppointmentStatus.LEVEL_TESTED] === 'number'
                    ? `(${counts?.[AppointmentStatus.LEVEL_TESTED]})`
                    : null}
                </div>
              ),
            },
            {
              key: AppointmentStatus.CANCELED,
              label: (
                <div>
                  {AppointmentStatusMappingToLabel[AppointmentStatus.CANCELED]}{' '}
                  {typeof counts?.[AppointmentStatus.CANCELED] === 'number'
                    ? `(${counts?.[AppointmentStatus.CANCELED]})`
                    : null}
                </div>
              ),
            },
          ]}
        />
      </div>
      <SearchNFilter
        containerClassName={classNames(
          'mb-0 flex-shrink-0 sm:min-w-[380px] lg:basis-[52%] xl:basis-[50%] 2xl:basis-[600px] !justify-start w-full',
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
          hideFilter: hideFilter,
          uid: UID,
          onReset: handleResetFormFilterValues,
          count: getCountForFilterDrawer({
            fieldKeys: ['organizationId', 'isOwner'],
            formFilterValues,
          }),
          form: (
            <Form method="GET" id={UID} onSubmit={handleSubmit}>
              <Field label={t('appointment:owner')}>
                <SelectSingle
                  options={[
                    { label: t('appointment:all'), value: 0, rawData: undefined },
                    { label: t('appointment:me'), value: 1, rawData: undefined },
                  ]}
                  value={Number(isOwner)}
                  onChange={value => setValue('isOwner', Boolean(value))}
                />
              </Field>
              {/* <Field label={t('appointment:status')}>
                <SelectAppointmentStatus
                  allowClear={false}
                  placeholder={t('appointment:status')}
                  withAllOption
                  appointmentStatus={status ?? 'all'}
                  onChange={value => setValue('status', value)}
                />
              </Field> */}
              {/* <Field label={t('appointment:appointment_date')}>
                <DatePicker
                  className="w-full"
                  placeholder={t('appointment:appointment_date')}
                  value={date ? dayjs(date) : undefined}
                  onChange={value => setValue('date', value?.toISOString())}
                />
              </Field> */}
              {/* <Field label={t('appointment:test_shift')}>
                <Select className="w-full" placeholder={t('appointment:test_shift')} />
              </Field>
              <Field label={t('appointment:test')}>
                <SelectIeltsTestEnum
                  ieltsTest={test as IeltsTestEnum | undefined}
                  onChange={value => setValue('test', value)}
                />
              </Field> */}
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
