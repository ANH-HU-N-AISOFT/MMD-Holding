import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { RangeDayPicker } from 'reactjs';
import { SelectSingle } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/base/utils/getCountForFilterDrawer';

export type FormFilterValues = Pick<ListingSearchParams, 'startDate' | 'endDate'>;

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
  const { t } = useTranslation(['common', 'contract']);

  const { setValue, watch, handleSubmit, reset } = useRemixForm<FormFilterValues>({
    mode: 'onSubmit',
    defaultValues: formFilterValues,
    resolver: zodResolver(lisitngUrlSearchParamsSchema),
    submitHandlers: {
      onValid: onFilter,
    },
  });
  const formValues = watch();

  const handleResetFormFilterValues = () => {
    reset({ endDate: undefined, startDate: undefined });
    onResetFilter?.();
  };

  useDeepCompareEffect(() => {
    reset(formFilterValues);
  }, [formFilterValues]);

  return (
    <SearchNFilter
      inputClassName="md:!max-w-[600px]"
      containerClassName={containerClassName}
      isSubmiting={isSubmiting}
      search={{
        placeholder: t('contract:search_placeholder'),
        searchValue: searchValue,
        onSearch: onSearch,
      }}
      filter={{
        uid: UID,
        onReset: handleResetFormFilterValues,
        count: getCountForFilterDrawer({ fieldKeys: ['startDate'], formFilterValues }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
              <Field label={t('contract:organization')}>
                <SelectSingle placeholder={t('contract:organization')} options={[]} />
              </Field>
              <Field label={t('contract:created_at')}>
                <RangeDayPicker
                  className="w-full"
                  presets={[
                    { label: t('contract:current_month'), value: [dayjs().startOf('month'), dayjs().endOf('month')] },
                    {
                      label: t('contract:prev_month'),
                      value: [dayjs().startOf('month').add(-1, 'month'), dayjs().endOf('month').add(-1, 'month')],
                    },
                  ]}
                  value={
                    formValues.startDate && formValues.endDate
                      ? [dayjs(formValues.startDate), dayjs(formValues.endDate)]
                      : undefined
                  }
                  onChange={value => {
                    const startDate = value?.[0].startOf('day').valueOf();
                    const endDate = value?.[1].endOf('day').valueOf();
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
