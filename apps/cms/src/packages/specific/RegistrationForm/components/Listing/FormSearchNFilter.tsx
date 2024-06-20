import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { DatePicker } from '~/components/AntCustom/DatePicker/DatePicker';
import { SelectMultiple } from '~/components/AntCustom/Select';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/@base/utils/getCountForFilterDrawer';

export type FormFilterValues = Pick<ListingSearchParams, 'courseIds' | 'createdAt'>;

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
  const { t } = useTranslation(['common', 'registration_form']);

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
    reset({ courseIds: undefined, createdAt: undefined });
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
        placeholder: t('registration_form:search_placeholder'),
        searchValue: searchValue,
        onSearch: onSearch,
      }}
      filter={{
        uid: UID,
        onReset: handleResetFormFilterValues,
        count: getCountForFilterDrawer({ fieldKeys: ['courseIds', 'createdAt'], formFilterValues }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
              <Field label={t('registration_form:course')}>
                <SelectMultiple
                  placeholder={t('registration_form:course')}
                  value={formValues.courseIds?.map(item => item.toString())}
                  onChange={value => {
                    setValue('courseIds', value);
                  }}
                  options={[
                    {
                      label: 'Khóa Basic (A0 - A1)',
                      value: '1',
                      rawData: { numberSessions: 20, name: 'Khóa Basic (A0 - A1)' },
                    },
                    {
                      label: 'Khóa Speed Up (A1 - A2)',
                      value: '2',
                      rawData: { numberSessions: 20, name: 'Khóa Speed Up (A1 - A2)' },
                    },
                    {
                      label: 'Khóa Communication (A2- A2+)',
                      value: '3',
                      rawData: { numberSessions: 20, name: 'Khóa Communication (A2- A2+)' },
                    },
                    {
                      label: 'Khóa Pre Ielts (A2+ - 3.5)',
                      value: '4',
                      rawData: { numberSessions: 25, name: 'Khóa Pre Ielts (A2+ - 3.5)' },
                    },
                    {
                      label: 'Khóa Intermediate (3.5 - 5.0)',
                      value: '5',
                      rawData: { numberSessions: 25, name: 'Khóa Intermediate (3.5 - 5.0)' },
                    },
                    {
                      label: 'Khóa Upper IELTS (5.0 - 6.5)',
                      value: '6',
                      rawData: { numberSessions: 25, name: 'Khóa Upper IELTS (5.0 - 6.5)' },
                    },
                    {
                      label: 'Khóa IELTS Advance (6.5 - 7.0+)',
                      value: '7',
                      rawData: { numberSessions: 30, name: 'Khóa IELTS Advance (6.5 - 7.0+)' },
                    },
                    {
                      label: 'Arena Summit (Tăng 0,5 band)',
                      value: '8',
                      rawData: { numberSessions: 15, name: 'Arena Summit (Tăng 0,5 band)' },
                    },
                  ]}
                />
              </Field>
              <Field label={t('registration_form:created_at')}>
                <DatePicker
                  className="!w-full"
                  placeholder={t('registration_form:created_at')}
                  value={formValues.createdAt ? dayjs(formValues.createdAt) : undefined}
                  onChange={value => {
                    setValue('createdAt', value?.valueOf());
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
