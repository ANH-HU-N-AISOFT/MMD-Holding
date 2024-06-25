import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { SingleDayPicker } from 'reactjs';
import { SelectSingle } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/@base/utils/getCountForFilterDrawer';
import { SelectCourseRoadmaps } from '~/packages/common/SelectVariants/SelectCourseRoadmaps';

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
                <SelectCourseRoadmaps
                  placeholder={t('registration_form:course')}
                  courseRoadmaps={formValues.courseIds?.map(item => item.toString())}
                  label={courseRoadmap => `${courseRoadmap.name} (${courseRoadmap.code})`}
                  onChange={value => {
                    setValue('courseIds', value);
                  }}
                />
              </Field>
              <Field label={t('registration_form:organization')}>
                <SelectSingle options={[]} placeholder={t('registration_form:organization')} />
              </Field>
              <Field label={t('registration_form:created_at')}>
                <SingleDayPicker
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
