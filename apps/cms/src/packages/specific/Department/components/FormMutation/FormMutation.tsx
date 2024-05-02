import { Input } from 'antd';
import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { getFormMutationResolver } from './zodResolver';
import { DatePicker } from '~/components/AntCustom/DatePicker/DatePicker';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Field } from '~/components/Field/Field';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { BusinessStatusEnum } from '~/packages/common/SelectVariants/BusinessStatus/constants/BusinessStatusEnum';
import { SelectBusinessStatus } from '~/packages/common/SelectVariants/BusinessStatus/SelectBusinessStatus';
import { SelectCity } from '~/packages/common/SelectVariants/SelectCity';
import { SelectManagementUnit } from '~/packages/common/SelectVariants/SelectManagementUnit';
import { SelectPresentDepartment } from '~/packages/common/SelectVariants/SelectPresentDepartment';

export interface FormValues {
  name: string;
  code: string;
  manageDepartmentId: string;
  businessStatus: BusinessStatusEnum;
  address: string;
  city: string;
  phone: string;
  email: string;
  presentDepartmentId: string;
  foundationDate: string;
}

interface Props {
  uid: string;
  isSubmiting: boolean;
  defaultValues?: Partial<FormValues>;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const FormMutation = ({ uid, defaultValues = {}, fieldsError = {}, isSubmiting, onSubmit, disabled }: Props) => {
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
      <Form method="POST" id={uid} onSubmit={handleSubmit}>
        <BoxFields>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <Field withRequiredMark label={t('department:name')} error={errors.name?.message}>
              <Input
                value={name}
                onChange={event => {
                  setValue('name', event.target.value);
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
                value={code}
                onChange={event => {
                  setValue('code', event.target.value);
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
                businessStatus={businessStatus}
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
                value={address}
                onChange={event => {
                  setValue('address', event.target.value);
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
                city={city}
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
                value={phone}
                onChange={event => {
                  setValue('phone', event.target.value);
                  if (errors.phone) {
                    trigger('phone');
                  }
                }}
                type="tel"
                addonBefore={<div>+84</div>}
                disabled={disabledField}
                placeholder={t('department:phone')}
              />
            </Field>
            <Field label={t('department:email')} error={errors.email?.message}>
              <Input
                value={email}
                onChange={event => {
                  setValue('email', event.target.value);
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
                presentDepartment={presentDepartmentId}
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
              <DatePicker
                format="DD/MM/YYYY"
                value={foundationDate ? dayjs(foundationDate) : undefined}
                onChange={value => {
                  setValue('foundationDate', value?.toISOString());
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
