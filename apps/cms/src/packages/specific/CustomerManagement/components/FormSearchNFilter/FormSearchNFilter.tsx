import { SearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { FilterDrawer } from '~/components/FilterDrawer/FilterDrawer';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/@base/utils/getCountForFilterDrawer';
import { debounce } from '~/utils/functions/debounce';

export interface FormFilterValues extends Pick<ListingSearchParams, 'status'> {}

interface FormFilterProps {
  onFilter?: (formFilterValues: FormFilterValues) => void;
  onResetFilter?: () => void;
  isSubmiting?: boolean;
  formFilterValues?: FormFilterValues;
  searchValue?: string;
  onSearch?: (value: string) => void;
}

// FIXME: Tách thành 1 component UI
const UID = 'FORM_FILTER_LISTING_CUSTOMER_MANAGEMENT';
export const FormSearchNFilter = ({
  formFilterValues = {},
  searchValue,
  onSearch,
  isSubmiting,
  onResetFilter,
  onFilter,
}: FormFilterProps) => {
  const { t } = useTranslation(['customer_management']);

  const {
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useRemixForm<FormFilterValues>({
    mode: 'onSubmit',
    defaultValues: formFilterValues,
    submitHandlers: {
      onValid: onFilter,
    },
  });
  const status = watch('status');

  const handleResetFormFilterValues = () => {
    reset({ status: undefined });
    onResetFilter?.();
  };

  useDeepCompareEffect(() => {
    reset(formFilterValues);
  }, [formFilterValues]);

  return (
    <div className="flex flex-col xs:flex-row sm:justify-end mb-1 gap-2">
      <Input
        defaultValue={searchValue}
        className="md:max-w-[350px]"
        placeholder={t('customer_management:search_placeholder')}
        size="large"
        suffix={<SearchOutlined />}
        onChange={debounce((event: ChangeEvent<HTMLInputElement>) => {
          onSearch?.(event.target.value);
        })}
      />
      <FilterDrawer
        isLoading={isSubmiting}
        count={getCountForFilterDrawer({ fieldKeys: ['status'], formFilterValues })}
        formId={UID}
        onReset={handleResetFormFilterValues}
      >
        <Form id={UID} onSubmit={handleSubmit}>
          <Field label={t('customer_management:status')} error={errors.status?.message}>
            <Select
              allowClear
              className="w-full"
              placeholder={t('customer_management:status')}
              value={status}
              onChange={value => {
                setValue('status', value);
                trigger('status');
              }}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
            />
          </Field>
        </Form>
      </FilterDrawer>
    </div>
  );
};
