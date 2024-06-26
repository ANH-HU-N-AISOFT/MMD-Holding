import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/base/utils/getCountForFilterDrawer';
import { SelectCourse } from '~/packages/specific/Course/components/SelectVariants/SelectCourse';
import { SelectCourseStatus } from '~/packages/specific/Course/components/SelectVariants/SelectCourseStatus';

export interface FormFilterValues extends Pick<ListingSearchParams, 'status' | 'courseId'> {}

interface FormFilterProps {
  onFilter?: (formFilterValues: FormFilterValues) => void;
  onResetFilter?: () => void;
  isSubmiting?: boolean;
  formFilterValues?: FormFilterValues;
  searchValue?: string;
  onSearch?: (value: string) => void;
  containerClassName?: string;
  hideFilter?: boolean;
  searchPlaceholder?: string;
}

const UID = 'FORM_FILTER_LISTING_COURSE_ROADMAP';
export const FormSearchNFilter = ({
  formFilterValues = {},
  searchValue,
  onSearch,
  isSubmiting,
  onResetFilter,
  onFilter,
  containerClassName,
  hideFilter,
  searchPlaceholder,
}: FormFilterProps) => {
  const { t } = useTranslation(['common', 'course_roadmap']);

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
    resolver: zodResolver(lisitngUrlSearchParamsSchema),
    submitHandlers: {
      onValid: onFilter,
    },
  });
  const status = watch('status');
  const courseId = watch('courseId');

  const handleResetFormFilterValues = () => {
    reset({ status: undefined, courseId: undefined });
    onResetFilter?.();
  };

  useDeepCompareEffect(() => {
    reset(formFilterValues);
  }, [formFilterValues]);

  return (
    <SearchNFilter
      inputClassName="md:!max-w-[450px] font-normal"
      containerClassName={containerClassName}
      isSubmiting={isSubmiting}
      search={{
        placeholder: searchPlaceholder ?? t('course_roadmap:search_placeholder'),
        searchValue: searchValue,
        onSearch: onSearch,
      }}
      filter={{
        uid: UID,
        hideFilter,
        onReset: handleResetFormFilterValues,
        count: getCountForFilterDrawer({ fieldKeys: ['status', 'courseId'], formFilterValues }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <Field label={t('course_roadmap:status')} error={errors.status?.message}>
              <SelectCourseStatus
                placeholder={t('course_roadmap:status')}
                courseStatus={status}
                onChange={value => {
                  setValue('status', value);
                  trigger('status');
                }}
              />
            </Field>
            <Field label={t('course_roadmap:course')} error={errors.courseId?.message}>
              <SelectCourse
                course={courseId}
                onChange={value => {
                  setValue('courseId', value);
                  trigger('courseId');
                }}
              />
            </Field>
          </Form>
        ),
      }}
    />
  );
};
