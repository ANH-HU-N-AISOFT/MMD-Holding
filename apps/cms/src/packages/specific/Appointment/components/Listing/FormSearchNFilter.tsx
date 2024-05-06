import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs } from 'antd';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect, useMobile } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/@base/utils/getCountForFilterDrawer';
import './styles.css';

export interface FormFilterValues extends Pick<ListingSearchParams, 'status'> {}

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
  const { t } = useTranslation(['common', 'appointment']);
  const { isMobile } = useMobile();

  const { handleSubmit, reset } = useRemixForm<FormFilterValues>({
    mode: 'onSubmit',
    defaultValues: formFilterValues,
    resolver: zodResolver(lisitngUrlSearchParamsSchema),
    submitHandlers: {
      onValid: onFilter,
    },
  });

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
      <div className="max-w-full lg:max-w-[320px]">
        <Tabs
          className="Appointment__type flex-1"
          // NOTE: 4 cái ngắn như này thôi thì đẹp
          items={[
            { key: 'all', label: 'Tất cả' },
            { key: 'booked', label: 'Đã hẹn' },
            { key: 'accepted', label: 'Đã xác nhận' },
            { key: 'today', label: 'Hôm nay' },
            { key: 'today2', label: 'Hôm nay' },
            { key: 'today3', label: 'Hôm nay' },
          ]}
        />
      </div>
      <SearchNFilter
        containerClassName={classNames(
          'mb-0 flex-shrink-0 sm:min-w-[380px] lg:basis-[380px] !justify-start w-full',
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
          count: getCountForFilterDrawer({ fieldKeys: ['status'], formFilterValues }),
          form: <Form method="GET" id={UID} onSubmit={handleSubmit}></Form>,
        }}
      />
    </div>
  );
};
