import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/@base/utils/getCountForFilterDrawer';
import { SelectFormStatus } from '~/packages/common/SelectVariants/FormStatus/SelectFormStatus';
import { SelectCourseRoadmap } from '~/packages/common/SelectVariants/SelectCourseRoadmap';

export type FormFilterValues = Pick<ListingSearchParams, 'status' | 'courseRoadmapId'>;

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
  const { t } = useTranslation(['common', 'consultant_form']);

  const { setValue, watch, handleSubmit, reset } = useRemixForm<FormFilterValues>({
    mode: 'onSubmit',
    defaultValues: formFilterValues,
    resolver: zodResolver(lisitngUrlSearchParamsSchema),
    submitHandlers: {
      onValid: onFilter,
    },
  });
  const status = watch('status');
  const courseRoadmapId = watch('courseRoadmapId');

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
        placeholder: t('consultant_form:search_placeholder'),
        searchValue: searchValue,
        onSearch: onSearch,
      }}
      filter={{
        uid: UID,
        onReset: handleResetFormFilterValues,
        count: getCountForFilterDrawer({ fieldKeys: ['courseRoadmapId', 'status'], formFilterValues }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
              <Field label={t('consultant_form:status')}>
                <SelectFormStatus
                  placeholder={t('consultant_form:status')}
                  formStatus={status}
                  onChange={value => {
                    setValue('status', value);
                  }}
                />
              </Field>
              <Field label={t('consultant_form:course_roadmap')}>
                <SelectCourseRoadmap
                  placeholder={t('consultant_form:course_roadmap')}
                  courseRoadmap={courseRoadmapId}
                  onChange={value => {
                    setValue('courseRoadmapId', value);
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
