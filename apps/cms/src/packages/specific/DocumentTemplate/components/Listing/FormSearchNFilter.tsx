import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Field, SingleDayPicker, useDeepCompareEffect } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/base/utils/getCountForFilterDrawer';

export interface FormFilterValues extends Pick<ListingSearchParams, 'createdAt'> {}

interface FormFilterProps {
  onFilter?: (formFilterValues: FormFilterValues) => void;
  onResetFilter?: () => void;
  isSubmiting?: boolean;
  formFilterValues?: FormFilterValues;
  searchValue?: string;
  onSearch?: (value: string) => void;
  containerClassName?: string;
}

const UID = 'FORM_FILTER_LISTING_CONSULTANT_FORM';
export const FormSearchNFilter = ({
  formFilterValues = {},
  searchValue,
  onSearch,
  isSubmiting,
  onResetFilter,
  onFilter,
  containerClassName,
}: FormFilterProps) => {
  const { t } = useTranslation(['common', 'document_template']);

  const { handleSubmit, reset, watch, setValue } = useRemixForm<FormFilterValues>({
    mode: 'onSubmit',
    defaultValues: formFilterValues,
    resolver: zodResolver(lisitngUrlSearchParamsSchema),
    submitHandlers: {
      onValid: onFilter,
    },
  });
  const createdAt = watch('createdAt');

  const handleResetFormFilterValues = () => {
    reset({ createdAt: undefined });
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
        placeholder: t('document_template:search_placeholder'),
        searchValue: searchValue,
        onSearch: onSearch,
      }}
      filter={{
        uid: UID,
        onReset: handleResetFormFilterValues,
        count: getCountForFilterDrawer({ fieldKeys: ['createdAt'], formFilterValues }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <Field label={t('document_template:created_at')}>
              <SingleDayPicker
                className="w-full"
                value={createdAt ? dayjs(createdAt) : undefined}
                onChange={value => {
                  setValue('createdAt', value?.toISOString());
                }}
              />
            </Field>
          </Form>
        ),
      }}
    />
  );
};
