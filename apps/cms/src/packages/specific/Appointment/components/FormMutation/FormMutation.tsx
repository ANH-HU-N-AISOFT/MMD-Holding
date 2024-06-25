import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { uniq } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Divider, Input, Radio, Textarea } from 'reactjs';
import { Field, SingleTimePicker, useDeepCompareEffect } from 'reactjs';
import { SingleDayPicker } from 'reactjs';
import { disableDaysPast } from 'reactjs';
import { SelectMultiple } from 'reactjs';
import { TypeOf } from 'zod';
import { Appointment } from '../../models/Appointment';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectAppointmentStatus } from '~/packages/common/SelectVariants/AppointmentStatus/SelectAppointmentStatus';
import { SelectIeltsTestEnum } from '~/packages/common/SelectVariants/IeltsTestEnum/SelectIeltsTestEnum';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import { DepartmentFields, SelectDepartments } from '~/packages/common/SelectVariants/SelectDepartments';
import { SelectEmployee } from '~/packages/common/SelectVariants/SelectEmployee';
import { SelectSaleEmployees } from '~/packages/common/SelectVariants/SelectSaleEmployees';
import { SelectSchool } from '~/packages/common/SelectVariants/SelectSchool';
import { SelectStudent } from '~/packages/common/SelectVariants/SelectStudent';
import { SelectTestShift } from '~/packages/common/SelectVariants/SelectTestShift';
import { SelectSourceEnum } from '~/packages/common/SelectVariants/SourceEnum/SelectSourceEnum';
import { TestType } from '~/packages/common/SelectVariants/TestType/constants/TestType';

export interface FormValues extends TypeOf<ReturnType<typeof getFormMutationSchema>> {}

interface Props {
  uid: string;
  isSubmiting: boolean;
  defaultValues?: Partial<FormValues>;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
  isEdit?: boolean;
  appointment: Appointment | undefined;
}

export const FormMutation = ({
  uid,
  defaultValues = {},
  fieldsError = {},
  isSubmiting,
  onSubmit,
  disabled,
  isEdit,
  appointment,
}: Props) => {
  const { t } = useTranslation(['common', 'appointment']);

  const disabledField = disabled || isSubmiting;

  const {
    handleSubmit,
    setError,
    reset,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useRemixForm<Partial<FormValues>>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: console.log,
    },
    defaultValues: {
      ...defaultValues,
    },
    resolver: getFormMutationResolver(t as TFunction<['common', 'appointment']>),
  });
  // Student
  const studentId = watch('studentId');
  const studentPhoneNumber = watch('studentPhoneNumber');
  const studentSchool = watch('studentSchool');
  const studentSource = watch('studentSource');
  const studentSaleEmployees = watch('studentSaleEmployees');
  const departmentOfSaleEmployees = watch('departmentOfSaleEmployees');

  // Appointment
  const appointmentStatus = watch('appointmentStatus');
  const expectInspectionDepartmentId = watch('expectInspectionDepartmentId');
  const testType = watch('testType');
  const appointmentDate = watch('appointmentDate');
  const appointmentTime = watch('appointmentTime');
  const ieltsTestType = watch('ieltsTestType');
  const demand = watch('demand');
  const extraDemand = watch('extraDemand');
  const testShiftId = watch('testShiftId');

  // Supporters
  const consultant = watch('consultant');
  const admin = watch('admin');
  const tester = watch('tester');

  // Extra
  const note = watch('note');

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
      });
    }
  }, [defaultValues]);

  return (
    <div>
      <Form
        method="POST"
        id={uid}
        onSubmit={handleSubmit}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
      >
        <BoxFields>
          <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <Field withRequiredMark label={t('appointment:student')} error={errors.studentId?.message}>
              <SelectStudent
                disabled={disabledField || isEdit}
                student={studentId}
                onChange={(value, option) => {
                  setValue('studentId', value);
                  setValue('studentPhoneNumber', option?.rawData.phoneNumber);
                  setValue('studentSchool', option?.rawData.school?.id);
                  setValue('studentSource', option?.rawData.source);
                  setValue(
                    'studentSaleEmployees',
                    uniq((option?.rawData.supporters ?? []).map(supporter => supporter.id)),
                  );
                  setValue(
                    'departmentOfSaleEmployees',
                    uniq((option?.rawData.supporterOrganizationIds ?? []).map(item => item.id)),
                  );
                  if (errors.studentId) {
                    trigger('studentId');
                  }
                }}
              />
            </Field>
            <Field label={t('appointment:phone')} error={errors.studentPhoneNumber?.message}>
              <Input
                value={studentPhoneNumber ?? undefined}
                addonBefore={<div>+84</div>}
                readOnly
                disabled
                placeholder={t('appointment:phone')}
              />
            </Field>
            <Field label={t('appointment:school')} error={errors.studentSchool?.message}>
              <SelectSchool school={studentSchool ?? undefined} cityCode="GET_ALL" disabled />
            </Field>
            <Field label={t('appointment:source')} error={errors.studentSource?.message}>
              <SelectSourceEnum allowClear={false} sourceEnum={studentSource ?? undefined} disabled />
            </Field>
            <Field label={t('appointment:sale_employees')} error={errors.studentSaleEmployees?.message}>
              <SelectSaleEmployees saleEmployees={studentSaleEmployees ?? undefined} organizations="GET_ALL" disabled />
            </Field>
            <Field label={t('appointment:department')} error={errors.departmentOfSaleEmployees?.message}>
              <SelectDepartments
                extraDepartments={(appointment?.saleEmployees ?? [])?.reduce<DepartmentFields[]>((result, item) => {
                  if (item.organization) {
                    return result.concat({
                      id: item.organization.id,
                      code: item.organization.code,
                      name: item.organization.fullName,
                    });
                  }
                  return result;
                }, [])}
                departments={departmentOfSaleEmployees ?? undefined}
                disabled
              />
            </Field>
            <div className="md:col-span-2">
              <Divider orientation="center">
                <div className="text-base font-semibold">{t('appointment:appointment')}</div>
              </Divider>
            </div>
            <Field label={t('appointment:status')} error={errors.appointmentStatus?.message}>
              <SelectAppointmentStatus
                allowClear={false}
                appointmentStatus={appointmentStatus}
                onChange={value => {
                  if (value !== 'all') {
                    setValue('appointmentStatus', value);
                    if (errors.appointmentStatus) {
                      trigger('appointmentStatus');
                    }
                  }
                }}
                disabled={disabledField}
              />
            </Field>
            <Field
              withRequiredMark
              label={t('appointment:expect_inspection_department')}
              error={errors.expectInspectionDepartmentId?.message}
            >
              <SelectDepartment
                extraDepartments={appointment?.organization ? [appointment?.organization] : []}
                department={expectInspectionDepartmentId}
                onChange={value => {
                  setValue('expectInspectionDepartmentId', value);
                  setValue('testShiftId', undefined);
                  if (errors.expectInspectionDepartmentId) {
                    trigger('expectInspectionDepartmentId');
                  }
                }}
                disabled={disabledField}
              />
            </Field>
            <Field withRequiredMark label={t('appointment:demand')} error={errors.demand?.message}>
              <SelectMultiple
                allowClear={false}
                value={demand}
                onChange={value => {
                  setValue('demand', value);
                  if (value?.includes('Khác')) {
                    setValue('extraDemand', '');
                  } else {
                    setValue('extraDemand', null);
                    trigger('extraDemand');
                  }
                  if (errors.demand) {
                    trigger('demand');
                  }
                }}
                options={[
                  { value: 'Chờ thông tin bên trung tâm', label: 'Chờ thông tin bên trung tâm', rawData: undefined },
                  { value: 'Khác', label: 'Khác', rawData: undefined },
                ]}
                disabled={disabledField}
                placeholder={t('appointment:demand')}
              />
            </Field>
            {demand?.includes('Khác') && (
              <Field label={t('appointment:extra_demand')} error={errors.extraDemand?.message}>
                <Input
                  disabled={disabledField}
                  placeholder={t('appointment:extra_demand')}
                  value={extraDemand ?? undefined}
                  onChange={value => {
                    setValue('extraDemand', value);
                    if (errors.extraDemand) {
                      trigger('extraDemand');
                    }
                  }}
                />
              </Field>
            )}
            <Field label={t('appointment:test_type')} error={errors.testType?.message}>
              <Radio
                items={[
                  { value: TestType.OFFLINE, label: t('appointment:offline') },
                  { value: TestType.ONLINE, label: t('appointment:online') },
                ]}
                disabled={disabledField}
                onChange={value => {
                  setValue('testType', value);
                  if (errors.testType) {
                    trigger('testType');
                  }
                }}
                value={testType}
              />
            </Field>
            <Field withRequiredMark label={t('appointment:appointment_date')} error={errors.appointmentDate?.message}>
              <SingleDayPicker
                disabledDate={isEdit ? undefined : disableDaysPast}
                disabled={disabledField}
                placeholder={t('appointment:appointment_date')}
                className="w-full"
                value={appointmentDate ? dayjs(appointmentDate) : undefined}
                onChange={value => {
                  setValue('appointmentDate', value?.startOf('day').toISOString());
                  setValue('testShiftId', undefined);
                  if (errors.appointmentDate) {
                    trigger('appointmentDate');
                  }
                }}
              />
            </Field>
            <Field withRequiredMark label={t('appointment:appointment_time')} error={errors.appointmentTime?.message}>
              <SingleTimePicker
                format="HH:mm"
                disabled={disabledField}
                placeholder={t('appointment:appointment_time')}
                className="w-full"
                value={appointmentTime ? dayjs(appointmentTime, 'HH:mm') : undefined}
                onChange={value => {
                  setValue('appointmentTime', value?.format('HH:mm'));
                  if (errors.appointmentTime) {
                    trigger('appointmentTime');
                  }
                }}
              />
            </Field>
            <Field withRequiredMark label={t('appointment:test')} error={errors.ieltsTestType?.message}>
              <SelectIeltsTestEnum
                allowClear={false}
                ieltsTest={ieltsTestType}
                onChange={value => {
                  setValue('ieltsTestType', value);
                  if (errors.ieltsTestType) {
                    trigger('ieltsTestType');
                  }
                }}
                disabled={disabledField}
                placeholder={t('appointment:test')}
              />
            </Field>
            <Field withRequiredMark label={t('appointment:test_shift')} error={errors.testShiftId?.message}>
              <SelectTestShift
                disabled={disabledField}
                testOrganizationId={expectInspectionDepartmentId}
                appointmentDate={appointmentDate}
                testShift={testShiftId}
                onChange={value => {
                  setValue('testShiftId', value);
                  if (errors.testShiftId) {
                    trigger('testShiftId');
                  }
                }}
              />
            </Field>
            <div className="md:col-span-2">
              <Divider orientation="center">
                <div className="text-base font-semibold">{t('appointment:supporter')}</div>
              </Divider>
            </div>
            <Field withRequiredMark label={t('appointment:consultant')} error={errors.consultant?.message}>
              <SelectEmployee
                organizationId={expectInspectionDepartmentId}
                emptyText={t('appointment:must_select_expect_inspection_department')}
                roles={[Role.Consultant]}
                placeholder={t('appointment:consultant')}
                employee={consultant}
                onChange={value => {
                  setValue('consultant', value);
                  if (errors.consultant) {
                    trigger('consultant');
                  }
                }}
                disabled={disabledField}
              />
            </Field>
            <Field label={t('appointment:admin')} error={errors.admin?.message}>
              <SelectEmployee
                organizationId={expectInspectionDepartmentId}
                emptyText={t('appointment:must_select_expect_inspection_department')}
                roles={[Role.Admin]}
                allowClear
                placeholder={t('appointment:admin')}
                disabled={disabledField}
                employee={admin ?? undefined}
                onChange={value => {
                  setValue('admin', value);
                  if (errors.admin) {
                    trigger('admin');
                  }
                }}
              />
            </Field>
            <Field label={t('appointment:tester')}>
              <SelectEmployee
                organizationId={expectInspectionDepartmentId}
                emptyText={t('appointment:must_select_expect_inspection_department')}
                roles={[Role.Lecturer]}
                allowClear
                placeholder={t('appointment:tester')}
                disabled={disabledField}
                employee={tester ?? undefined}
                onChange={value => {
                  setValue('tester', value);
                  if (errors.tester) {
                    trigger('tester');
                  }
                }}
              />
            </Field>
            <div className="md:col-span-2">
              <Divider orientation="center">
                <div className="text-base font-semibold">{t('appointment:extra_information')}</div>
              </Divider>
            </div>
            <div className="md:col-span-2">
              <Field label={t('appointment:note')} error={errors.note?.message}>
                <Textarea
                  rows={6}
                  showCount
                  maxLength={256}
                  value={note ?? undefined}
                  onChange={value => {
                    setValue('note', value);
                    if (errors.note) {
                      trigger('note');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('appointment:note')}
                />
              </Field>
            </div>
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
