import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { SingleDayPicker } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/@base/utils/getCountForFilterDrawer';
import { SelectDocumentTemplateStatus } from '~/packages/common/SelectVariants/DocumentTemplateStatus/SelectDocumentTemplateStatus';
import { SelectDocumentTemplateType } from '~/packages/common/SelectVariants/DocumentTemplateType/SelectDocumentTemplateType';

export interface FormFilterValues extends Pick<ListingSearchParams, 'createdAt' | 'status' | 'type'> {}

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
  const type = watch('type');
  const status = watch('status');

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
        count: getCountForFilterDrawer({ fieldKeys: ['createdAt', 'type', 'status'], formFilterValues }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <Field label={t('document_template:document_template_type')}>
              <SelectDocumentTemplateType
                allowClear
                documentTemplateType={type}
                onChange={value => {
                  setValue('type', value);
                }}
              />
            </Field>
            <Field label={t('document_template:status')}>
              <SelectDocumentTemplateStatus
                allowClear
                documentTemplateStatus={status}
                onChange={value => {
                  setValue('status', value);
                }}
              />
            </Field>
            <Field label={t('document_template:created_at')}>
              <SingleDayPicker
                className="w-full"
                value={createdAt ? dayjs(createdAt) : undefined}
                onChange={value => {
                  setValue('createdAt', value?.valueOf());
                }}
              />
            </Field>
          </Form>
        ),
      }}
    />
  );
};
