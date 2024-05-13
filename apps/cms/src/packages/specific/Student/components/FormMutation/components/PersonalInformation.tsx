import { Divider, Input, Radio } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { DeepPartial } from 'typescript-utilities';
import { FormValues } from '../FormMutation';
import { DatePicker } from '~/components/AntCustom/DatePicker/DatePicker';
import { Field } from '~/components/Field/Field';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectGender } from '~/packages/common/SelectVariants/Gender/SelectGender';
import { SelectCity } from '~/packages/common/SelectVariants/SelectCity';
import { SelectDepartments } from '~/packages/common/SelectVariants/SelectDepartments';
import { SelectDistrict } from '~/packages/common/SelectVariants/SelectDistrict';
import { SelectSaleEmployees } from '~/packages/common/SelectVariants/SelectSaleEmployees';
import { SelectSchool } from '~/packages/common/SelectVariants/SelectSchool';
import { SelectSourceEnum } from '~/packages/common/SelectVariants/SourceEnum/SelectSourceEnum';
import { disableFuture } from '~/utils/functions/disableDatePicker';
import { takeOnlyNumber } from '~/utils/functions/handleInputValue/takeOnlyNumber';

interface Props {
  form: ReturnType<typeof useRemixForm<DeepPartial<FormValues>>>;
  disabledField: boolean;
}

export const PersonalInformation = ({ form, disabledField }: Props) => {
  const { t } = useTranslation(['common', 'student']);

  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form;
  const fullName = watch('personalInformation.fullName');
  const phone = watch('personalInformation.phone');
  const username = watch('roleSystem.username');
  const email = watch('personalInformation.email');
  const currentAddress = watch('personalInformation.currentAddress');
  const city = watch('personalInformation.city');
  const district = watch('personalInformation.district');
  const dateOfBirth = watch('personalInformation.dateOfBirth');
  const school = watch('personalInformation.school');
  const gender = watch('personalInformation.gender');
  const parentPhone = watch('personalInformation.parentPhone');
  const notifyResultToParent = watch('personalInformation.notifyResultToParent');
  const source = watch('personalInformation.source');
  const departments = watch('personalInformation.departments')?.filter((item): item is string => Boolean(item));
  const saleEmployees = watch('personalInformation.saleEmployees');

  const cityCode = watch('temporaryOptional.cityCode');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Field withRequiredMark label={t('student:fullName')} error={errors.personalInformation?.fullName?.message}>
        <Input
          value={fullName}
          onChange={event => {
            setValue('personalInformation.fullName', event.target.value);
            if (errors.personalInformation?.fullName) {
              trigger('personalInformation.fullName');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:fullName')}
        />
      </Field>
      <Field withRequiredMark label={t('student:phone')} error={errors.personalInformation?.phone?.message}>
        <Input
          value={phone}
          onChange={event => {
            const value = takeOnlyNumber(event);
            setValue('personalInformation.phone', value);
            if (errors.personalInformation?.phone) {
              trigger('personalInformation.phone');
            }
            if (!username || username === phone) {
              setValue('roleSystem.username', value);
            }
          }}
          addonBefore={<div>+84</div>}
          disabled={disabledField}
          placeholder={t('student:phone')}
        />
      </Field>
      <Field label={t('student:email')} error={errors.personalInformation?.email?.message}>
        <Input
          value={email ?? undefined}
          onChange={event => {
            setValue('personalInformation.email', event.target.value);
            if (errors.personalInformation?.email) {
              trigger('personalInformation.email');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:email')}
        />
      </Field>
      <Field label={t('student:current_address')} error={errors.personalInformation?.currentAddress?.message}>
        <Input
          value={currentAddress ?? undefined}
          onChange={event => {
            setValue('personalInformation.currentAddress', event.target.value);
            if (errors.personalInformation?.currentAddress) {
              trigger('personalInformation.currentAddress');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:current_address')}
        />
      </Field>
      <Field label={t('student:city')} error={errors.personalInformation?.city?.message}>
        <SelectCity
          city={city ?? undefined}
          onChange={(value, option) => {
            setValue('personalInformation.city', value);
            setValue('personalInformation.district', undefined);
            setValue('personalInformation.school', undefined);
            setValue('temporaryOptional.cityCode', option?.rawData.code);
            if (errors.personalInformation?.city) {
              trigger('personalInformation.city');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('student:district')} error={errors.personalInformation?.district?.message}>
        <SelectDistrict
          cityCode={cityCode}
          district={district ?? undefined}
          onChange={value => {
            setValue('personalInformation.district', value);
            if (errors.personalInformation?.district) {
              trigger('personalInformation.district');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('student:date_of_birth')} error={errors.personalInformation?.dateOfBirth?.message}>
        <DatePicker
          disabledDate={disableFuture}
          format="DD/MM/YYYY"
          value={dateOfBirth ? dayjs(dateOfBirth) : undefined}
          onChange={value => {
            setValue('personalInformation.dateOfBirth', value?.startOf('day')?.toISOString());
            if (errors.personalInformation?.dateOfBirth) {
              trigger('personalInformation.dateOfBirth');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:date_of_birth')}
          className="w-full"
        />
      </Field>
      <Field label={t('student:school')} error={errors.personalInformation?.school?.message}>
        <SelectSchool
          school={school ?? undefined}
          cityCode={cityCode}
          onChange={value => {
            setValue('personalInformation.school', value);
            if (errors.personalInformation?.school) {
              trigger('personalInformation.school');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('student:gender')} error={errors.personalInformation?.gender?.message}>
        <SelectGender
          gender={gender ?? undefined}
          onChange={value => {
            setValue('personalInformation.gender', value);
            if (errors.personalInformation?.gender) {
              trigger('personalInformation.gender');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <div className="md:col-span-2">
        <Divider orientation="center">{t('student:parent')}</Divider>
      </div>
      <Field label={t('student:parent_phone')} error={errors.personalInformation?.parentPhone?.message}>
        <Input
          value={parentPhone ?? undefined}
          onChange={event => {
            setValue('personalInformation.parentPhone', event.target.value);
            if (errors.personalInformation?.parentPhone) {
              trigger('personalInformation.parentPhone');
            }
          }}
          disabled={disabledField}
          placeholder={t('student:parent_phone')}
        />
      </Field>
      <Field
        label={t('student:notify_result_to_parent')}
        error={errors.personalInformation?.notifyResultToParent?.message}
      >
        <Radio.Group
          disabled={disabledField}
          onChange={event => {
            setValue('personalInformation.notifyResultToParent', event.target.value);
            if (errors.personalInformation?.notifyResultToParent) {
              trigger('personalInformation.notifyResultToParent');
            }
          }}
          value={notifyResultToParent}
        >
          <Radio value={false}>{t('student:disable_notify')}</Radio>
          <Radio value={true}>{t('student:enable_notify')}</Radio>
        </Radio.Group>
      </Field>
      <div className="md:col-span-2">
        <Divider orientation="center">{t('student:branch')}</Divider>
      </div>
      <Field label={t('student:source')} error={errors.personalInformation?.source?.message}>
        <SelectSourceEnum
          sourceEnum={source ?? undefined}
          onChange={value => {
            setValue('personalInformation.source', value);
            if (errors.personalInformation?.source) {
              trigger('personalInformation.source');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field
        withRequiredMark
        label={t('student:department')}
        help={t('student:department_help_text')}
        error={errors.personalInformation?.departments?.message}
      >
        <SelectDepartments
          departments={departments}
          onChange={value => {
            setValue('personalInformation.departments', value);
            setValue('personalInformation.saleEmployees', []);
            if (errors.personalInformation?.departments) {
              trigger('personalInformation.departments');
            }
          }}
          disabled={disabledField}
        />
      </Field>
      <Field label={t('student:sale_employees')} error={errors.personalInformation?.saleEmployees?.message}>
        <SelectSaleEmployees
          organizations={departments ?? []}
          saleEmployees={saleEmployees?.filter((item): item is string => Boolean(item))}
          onChange={value => {
            setValue('personalInformation.saleEmployees', value);
            if (errors.personalInformation?.saleEmployees) {
              trigger('personalInformation.saleEmployees');
            }
          }}
          disabled={disabledField}
        />
      </Field>
    </div>
  );
};
