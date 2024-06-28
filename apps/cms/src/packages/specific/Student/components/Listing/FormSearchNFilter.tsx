import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { Field } from '~/components/Field/Field';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/base/utils/getCountForFilterDrawer';
import { SelectDepartments } from '~/packages/specific/Department/components/SelectVariants/SelectDepartments';

export interface FormFilterValues extends Pick<ListingSearchParams, 'department'> {}

interface FormFilterProps {
  onFilter?: (formFilterValues: FormFilterValues) => void;
  onResetFilter?: () => void;
  isSubmiting?: boolean;
  formFilterValues?: FormFilterValues;
  searchValue?: string;
  onSearch?: (value: string) => void;
  containerClassName?: string;
  hideFilter?: boolean;
}

const UID = 'FORM_FILTER_LISTING_STUDENT';
export const FormSearchNFilter = ({
  formFilterValues = {},
  searchValue,
  onSearch,
  isSubmiting,
  onResetFilter,
  onFilter,
  containerClassName,
  hideFilter,
}: FormFilterProps) => {
  const { t } = useTranslation(['common', 'student']);
  const disabledField = !!isSubmiting;

  const { handleSubmit, reset, watch, setValue } = useRemixForm<FormFilterValues>({
    mode: 'onSubmit',
    defaultValues: formFilterValues,
    resolver: zodResolver(lisitngUrlSearchParamsSchema),
    submitHandlers: {
      onValid: onFilter,
    },
  });
  const department = watch('department');

  const handleResetFormFilterValues = () => {
    reset({});
    onResetFilter?.();
  };

  useDeepCompareEffect(() => {
    reset(formFilterValues);
  }, [formFilterValues]);

  return (
    <SearchNFilter
      inputClassName="md:!max-w-[540px]"
      containerClassName={containerClassName}
      isSubmiting={isSubmiting}
      search={{
        placeholder: t('student:search_placeholder'),
        searchValue: searchValue,
        onSearch: onSearch,
      }}
      filter={{
        hideFilter: hideFilter,
        uid: UID,
        onReset: handleResetFormFilterValues,
        count: getCountForFilterDrawer({ fieldKeys: ['department'], formFilterValues }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <Field label={t('student:department_name')}>
              <SelectDepartments
                scope="currentUser"
                disabled={disabledField}
                extraDepartments={[]}
                placeholder={t('student:department_name')}
                departments={department?.split(',')}
                fieldValue="code"
                fieldLabel={['name', 'code']}
                onChange={value => {
                  setValue('department', value?.join(','));
                }}
              />
            </Field>
          </Form>
        ),
      }}
    />
  );
};
