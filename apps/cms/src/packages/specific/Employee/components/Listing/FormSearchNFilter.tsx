import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SelectEmployeeStatus } from '../SelectVariants/SelectEmployeeStatus';
import { Field } from '~/components/Field/Field';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/base/utils/getCountForFilterDrawer';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectRoles } from '~/packages/common/SelectVariants/Role/SelectRoles';
import { SelectDepartment } from '~/packages/specific/Department/components/SelectVariants/SelectDepartment';

export interface FormFilterValues extends Pick<ListingSearchParams, 'status' | 'department' | 'roles'> {}

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

const UID = 'FORM_FILTER_LISTING_EMPLOYEE';
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
  const { t } = useTranslation(['common', 'employee']);
  const disabledField = !!isSubmiting;

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
      inputClassName="md:!max-w-[400px]"
      containerClassName={containerClassName}
      isSubmiting={isSubmiting}
      search={{
        placeholder: t('employee:search_placeholder'),
        searchValue: searchValue,
        onSearch: onSearch,
      }}
      filter={{
        uid: UID,
        hideFilter,
        onReset: handleResetFormFilterValues,
        count: getCountForFilterDrawer({ fieldKeys: ['department', 'roles', 'status'], formFilterValues }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <Field label={t('employee:status')}>
              <SelectEmployeeStatus
                disabled={disabledField}
                placeholder={t('employee:status')}
                employeeStatus={status}
                onChange={value => {
                  setValue('status', value);
                }}
              />
            </Field>
            <Field label={t('employee:department_name')}>
              <SelectDepartment
                disabled={disabledField}
                scope="currentUser"
                extraDepartments={[]}
                fieldValue="id"
                fieldLabel={['name', 'code']}
                placeholder={t('employee:department_name')}
                department={department}
                onChange={value => {
                  setValue('department', value);
                }}
              />
            </Field>
            <Field label={t('employee:role')}>
              <SelectRoles
                disabled={disabledField}
                ignoreRoles={[Role.Student]}
                roles={roles?.filter((item): item is Exclude<Role, Role.SuperAdmin> => {
                  return item !== Role.SuperAdmin && Object.values(Role).includes(item as Role);
                })}
                onChange={value => setValue('roles', value)}
              />
            </Field>
          </Form>
        ),
      }}
    />
  );
};
