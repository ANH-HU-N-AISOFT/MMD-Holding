import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { EmployeeStatus, Role } from '../../models/Employee';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { Field } from '~/components/Field/Field';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/@base/utils/getCountForFilterDrawer';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import { SelectEmployeeStatus } from '~/packages/common/SelectVariants/SelectEmployeeStatus';
import { SelectRoles } from '~/packages/common/SelectVariants/SelectRoles';

export interface FormFilterValues extends Pick<ListingSearchParams, 'status' | 'department' | 'roles'> {}

interface FormFilterProps {
  onFilter?: (formFilterValues: FormFilterValues) => void;
  onResetFilter?: () => void;
  isSubmiting?: boolean;
  formFilterValues?: FormFilterValues;
  searchValue?: string;
  onSearch?: (value: string) => void;
  containerClassName?: string;
}

const UID = 'FORM_FILTER_LISTING_CUSTOMER_MANAGEMENT';
export const FormSearchNFilter = ({
  formFilterValues = {},
  searchValue,
  onSearch,
  isSubmiting,
  onResetFilter,
  onFilter,
  containerClassName,
}: FormFilterProps) => {
  const { t } = useTranslation(['common', 'employee']);

  const { handleSubmit, reset, watch, setValue } = useRemixForm<FormFilterValues>({
    mode: 'onSubmit',
    defaultValues: formFilterValues,
    resolver: zodResolver(lisitngUrlSearchParamsSchema),
    submitHandlers: {
      onValid: onFilter,
    },
  });
  const status = watch('status');
  const department = watch('department');
  const roles = watch('roles');

  const handleResetFormFilterValues = () => {
    reset({});
    onResetFilter?.();
  };

  useDeepCompareEffect(() => {
    reset(formFilterValues);
  }, [formFilterValues]);

  return (
    <SearchNFilter
      containerClassName={containerClassName}
      isSubmiting={isSubmiting}
      search={{
        placeholder: t('employee:search_placeholder'),
        searchValue: searchValue,
        onSearch: onSearch,
      }}
      filter={{
        uid: UID,
        onReset: handleResetFormFilterValues,
        count: getCountForFilterDrawer({ fieldKeys: ['department', 'roles', 'status'], formFilterValues }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <Field label={t('employee:status')}>
              <SelectEmployeeStatus
                placeholder={t('employee:status')}
                employeeStatus={status as EmployeeStatus | undefined}
                onChange={value => {
                  setValue('status', value);
                }}
              />
            </Field>
            <Field label={t('employee:department_code')}>
              <SelectDepartment
                allowClear
                placeholder={t('employee:department_code')}
                department={department}
                onChange={value => {
                  setValue('department', value);
                }}
              />
            </Field>
            <Field label={t('employee:role')}>
              <SelectRoles
                allowClear
                roles={roles?.split(',').filter((item): item is Role => {
                  return !!Role[item as keyof typeof Role];
                })}
                onChange={value => {
                  setValue('roles', value.join(','));
                }}
              />
            </Field>
          </Form>
        ),
      }}
    />
  );
};
