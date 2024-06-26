import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Input } from 'reactjs';
import { useDeepCompareEffect } from 'reactjs';
import { SingleDayPicker } from 'reactjs';
import { TypeOf } from 'zod';
import { BusinessStatusEnum } from '../../models/BusinessStatusEnum';
import { Department } from '../../models/Department';
import { SelectBusinessStatus } from '../SelectVariants/SelectBusinessStatus';
import { SelectManagementUnit } from '../SelectVariants/SelectManagementUnit';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Field } from '~/components/Field/Field';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { SelectCity } from '~/packages/extends/Location/components/SelectVariants/SelectCity';
import { SelectPresentDepartment } from '~/packages/specific/Employee/components/SelectVariants/SelectPresentDepartment';
import { takeOnlyNumber } from '~/utils/functions/handleInputValue/takeOnlyNumber';

export interface FormValues extends TypeOf<ReturnType<typeof getFormMutationSchema>> {}

interface Props {
  uid: string;
  isSubmiting: boolean;
  defaultValues?: Partial<FormValues>;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
  department: Department | undefined;
}

export const FormMutation = ({
  uid,
  defaultValues = {},
  fieldsError = {},
  isSubmiting,
  onSubmit,
  disabled,
  department,
}: Props) => {
  const { t } = useTranslation(['common', 'department']);

  const disabledField = disabled || isSubmiting;

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useRemixForm<Partial<FormValues>>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: console.log,
    },
    defaultValues: {
      ...defaultValues,
      businessStatus: defaultValues.businessStatus ?? BusinessStatusEnum.ACTIVE,
    },
    resolver: getFormMutationResolver(t as TFunction<['common', 'department']>),
  });
  const name = watch('name');
  const code = watch('code');
  const manageDepartmentId = watch('manageDepartmentId');
  const businessStatus = watch('businessStatus');
  const address = watch('address');
  const city = watch('city');
  const phone = watch('phone');
  const email = watch('email');
  const presentDepartmentId = watch('presentDepartmentId');
  const foundationDate = watch('foundationDate');

  useDeepCompareEffect(() => {
    Object.keys(fieldsError).forEach(key => {
      const key_ = key as keyof typeof fieldsError;
      if (fieldsError[key_]) {
        setError(key_, {
          message: fieldsError[key_],
        });
      }
    });
  }, [fieldsError]);

  useDeepCompareEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        businessStatus: defaultValues.businessStatus ?? BusinessStatusEnum.ACTIVE,
      });
    }
  }, [defaultValues]);

  return (
    <div>
      <Form
        method="POST"
        id={uid}
        onSubmit={event => {
          event.stopPropagation();
          handleSubmit(event);
        }}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
      >
        <BoxFields>
          <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <Field withRequiredMark label={t('department:name')} error={errors.name?.message}>
              <Input
                showCount
                maxLength={32}
                value={name}
                onChange={value => {
                  setValue('name', value);
                  if (errors.name) {
                    trigger('name');
                  }
                }}
                disabled={disabledField}
                placeholder={t('department:name')}
              />
            </Field>
            <Field withRequiredMark label={t('department:code')} error={errors.code?.message}>
              <Input
                showCount
                maxLength={12}
                value={code}
                onChange={value => {
                  setValue('code', value);
                  if (errors.code) {
                    trigger('code');
                  }
                }}
                disabled={disabledField}
                placeholder={t('department:code')}
              />
            </Field>
            <Field
              withRequiredMark
              label={t('department:manage_department')}
              error={errors.manageDepartmentId?.message}
            >
              <SelectManagementUnit
                extraDepartments={department?.managementUnit ? [department.managementUnit] : []}
                managementUnit={manageDepartmentId}
                onChange={value => {
                  setValue('manageDepartmentId', value);
                  if (errors.manageDepartmentId) {
                    trigger('manageDepartmentId');
                  }
                }}
                disabled={disabledField}
              />
            </Field>
            <Field label={t('department:business_status')} error={errors.businessStatus?.message}>
              <SelectBusinessStatus
                allowClear={false}
                businessStatus={businessStatus ?? undefined}
                placeholder={t('department:business_status')}
                onChange={value => {
                  setValue('businessStatus', value);
                  if (errors.businessStatus) {
                    trigger('businessStatus');
                  }
                }}
                disabled={disabledField}
              />
            </Field>
            <Field label={t('department:address')} error={errors.address?.message}>
              <Input
                showCount
                maxLength={64}
                value={address ?? undefined}
                onChange={value => {
                  setValue('address', value);
                  if (errors.address) {
                    trigger('address');
                  }
                }}
                disabled={disabledField}
                placeholder={t('department:address')}
              />
            </Field>
            <Field label={t('department:city')} error={errors.city?.message}>
              <SelectCity
                city={city ?? undefined}
                fieldKey="name"
                onChange={value => {
                  setValue('city', value);
                  if (errors.city) {
                    trigger('city');
                  }
                }}
                disabled={disabledField}
              />
            </Field>
            <Field label={t('department:phone')} error={errors.phone?.message}>
              <Input
                value={phone ?? undefined}
                onChange={value => {
                  setValue('phone', value ? takeOnlyNumber(value) : undefined);
                  if (errors.phone) {
                    trigger('phone');
                  }
                }}
                addonBefore={<div>+84</div>}
                disabled={disabledField}
                placeholder={t('department:phone')}
              />
            </Field>
            <Field label={t('department:email')} error={errors.email?.message}>
              <Input
                value={email ?? undefined}
                onChange={value => {
                  setValue('email', value);
                  if (errors.email) {
                    trigger('email');
                  }
                }}
                disabled={disabledField}
                placeholder={t('department:email')}
              />
            </Field>
            <Field label={t('department:present_department')} error={errors.presentDepartmentId?.message}>
              <SelectPresentDepartment
                placeholder={t('department:present_department')}
                presentDepartment={presentDepartmentId ?? undefined}
                onChange={value => {
                  setValue('presentDepartmentId', value);
                  if (errors.presentDepartmentId) {
                    trigger('presentDepartmentId');
                  }
                }}
                disabled={disabledField}
              />
            </Field>
            <Field label={t('department:foundation_date')} error={errors.foundationDate?.message}>
              <SingleDayPicker
                format="DD/MM/YYYY"
                value={foundationDate ? dayjs(foundationDate) : undefined}
                onChange={value => {
                  setValue('foundationDate', value?.startOf('day')?.toISOString());
                  if (errors.foundationDate) {
                    trigger('foundationDate');
                  }
                }}
                disabled={disabledField}
                placeholder={t('department:foundation_date')}
                className="w-full"
              />
            </Field>
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
