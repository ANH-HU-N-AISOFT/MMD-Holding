import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { RangeDayPicker } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SelectPromotionStatus } from '../SelectVariants/SelectPromotionStatus';
import { SelectPromotionType } from '../SelectVariants/SelectPromotionType';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/base/utils/getCountForFilterDrawer';

export type FormFilterValues = Pick<ListingSearchParams, 'status' | 'promotionType' | 'endDate' | 'startDate'>;

interface FormFilterProps {
  onFilter?: (formFilterValues: FormFilterValues) => void;
  onResetFilter?: () => void;
  isSubmiting?: boolean;
  formFilterValues?: FormFilterValues;
  searchValue?: string;
  onSearch?: (value: string) => void;
  containerClassName?: string;
}

const UID = 'FORM_FILTER_LISTING_PROMOTION';
export const FormSearchNFilter = ({
  formFilterValues = {},
  searchValue,
  onSearch,
  isSubmiting,
  onResetFilter,
  onFilter,
  containerClassName,
}: FormFilterProps) => {
  const { t } = useTranslation(['common', 'promotion']);

  const { setValue, watch, handleSubmit, reset } = useRemixForm<FormFilterValues>({
    mode: 'onSubmit',
    defaultValues: formFilterValues,
    resolver: zodResolver(lisitngUrlSearchParamsSchema),
    submitHandlers: {
      onValid: onFilter,
    },
  });
  const status = watch('status');
  const promotionType = watch('promotionType');
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const handleResetFormFilterValues = () => {
    reset({ status: undefined });
    onResetFilter?.();
  };

  useDeepCompareEffect(() => {
    reset(formFilterValues);
  }, [formFilterValues]);

  return (
    <SearchNFilter
      inputClassName="md:!max-w-[450px]"
      containerClassName={containerClassName}
      isSubmiting={isSubmiting}
      search={{
        placeholder: t('promotion:search_placeholder'),
        searchValue: searchValue,
        onSearch: onSearch,
      }}
      filter={{
        uid: UID,
        onReset: handleResetFormFilterValues,
        count: getCountForFilterDrawer({ fieldKeys: ['status', 'promotionType', 'startDate'], formFilterValues }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
              <Field label={t('promotion:status')}>
                <SelectPromotionStatus
                  promotionStatus={status}
                  onChange={value => {
                    setValue('status', value);
                  }}
                />
              </Field>
              <Field label={t('promotion:type')}>
                <SelectPromotionType
                  promotionType={promotionType}
                  onChange={value => {
                    setValue('promotionType', value);
                  }}
                />
              </Field>
              <Field label={t('promotion:date_available')}>
                <RangeDayPicker
                  className="w-full"
                  presets={[
                    { label: t('promotion:current_month'), value: [dayjs().startOf('month'), dayjs().endOf('month')] },
                    {
                      label: t('promotion:next_month'),
                      value: [dayjs().startOf('month').add(1, 'month'), dayjs().endOf('month').add(1, 'month')],
                    },
                  ]}
                  value={startDate && endDate ? [dayjs(startDate), dayjs(endDate)] : undefined}
                  onChange={value => {
                    const startDate = value?.[0].startOf('day').toISOString();
                    const endDate = value?.[1].endOf('day').toISOString();
                    setValue('startDate', startDate);
                    setValue('endDate', endDate);
                  }}
                />
              </Field>
            </div>
          </Form>
        ),
      }}
    />
  );
};
