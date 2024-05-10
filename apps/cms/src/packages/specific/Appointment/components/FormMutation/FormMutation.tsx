import { Divider, Input, Radio } from 'antd';
import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { getFormMutationResolver } from './zodResolver';
import { DatePicker } from '~/components/AntCustom/DatePicker/DatePicker';
import { SelectMultiple } from '~/components/AntCustom/Select';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { AppointmentStatus } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatus';
import { SelectAppointmentStatus } from '~/packages/common/SelectVariants/AppointmentStatus/SelectAppointmentStatus';
import { IeltsTestEnum } from '~/packages/common/SelectVariants/IeltsTestEnum/constants/IeltsTestEnum';
import { SelectIeltsTestEnum } from '~/packages/common/SelectVariants/IeltsTestEnum/SelectIeltsTestEnum';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import { SelectDepartments } from '~/packages/common/SelectVariants/SelectDepartments';
import { SelectEmployee } from '~/packages/common/SelectVariants/SelectEmployee';
import { SelectSaleEmployees } from '~/packages/common/SelectVariants/SelectSaleEmployees';
import { SelectSchool } from '~/packages/common/SelectVariants/SelectSchool';
import { SelectStudent } from '~/packages/common/SelectVariants/SelectStudent';
import { SelectTestShift } from '~/packages/common/SelectVariants/SelectTestShift';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';
import { SelectSourceEnum } from '~/packages/common/SelectVariants/SourceEnum/SelectSourceEnum';
import { TestType } from '~/packages/common/SelectVariants/TestType/constants/TestType';
import { disablePast } from '~/utils/functions/disableDatePicker';

export interface FormValues {
  studentId: string;
  studentPhoneNumber?: string;
  studentSchool?: string;
  studentSource?: SourceEnum;
  studentSaleEmployees?: string[];
  studentDepartment?: string[];

  // Lịch hẹn
  appointmentStatus: AppointmentStatus;
  expectInspectionDepartmentId: string;
  testType: TestType;
  appointmentDate: string;
  appointmentTime: string;
  ieltsTestType: IeltsTestEnum;
  demand: string[];
  extraDemand: string;
  testShiftId: string;

  // Supporters
  consultant: string;
  admin: string;
  tester: string;

  // Extra
  note: string;
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
  const studentDepartment = watch('studentDepartment');

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
      <Form method="POST" id={uid} onSubmit={handleSubmit}>
        <BoxFields>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <Field withRequiredMark label={t('appointment:student')} error={errors.studentId?.message}>
              <SelectStudent
                disabled={disabledField}
                student={studentId}
                onChange={(value, option) => {
                  setValue('studentId', value);
                  setValue('studentPhoneNumber', option?.rawData.phoneNumber);
                  setValue('studentSchool', option?.rawData.school?.id);
                  setValue('studentSource', option?.rawData.source);
                  setValue('studentSaleEmployees', option?.rawData.supporters?.map(supporter => supporter.id));
                  setValue('studentDepartment', option?.rawData.organizations?.map(organization => organization.id));
                  if (errors.studentId) {
                    trigger('studentId');
                  }
                }}
              />
            </Field>
            <Field label={t('appointment:phone')} error={errors.studentPhoneNumber?.message}>
              <Input
                value={studentPhoneNumber}
                addonBefore={<div>+84</div>}
                readOnly
                disabled
                placeholder={t('appointment:phone')}
              />
            </Field>
            <Field label={t('appointment:school')} error={errors.studentSchool?.message}>
              <SelectSchool school={studentSchool} cityCode="GET_ALL" disabled />
            </Field>
            <Field label={t('appointment:source')} error={errors.studentSource?.message}>
              <SelectSourceEnum sourceEnum={studentSource} disabled />
            </Field>
            <Field label={t('appointment:sale_employees')} error={errors.studentSaleEmployees?.message}>
              <SelectSaleEmployees saleEmployees={studentSaleEmployees} organizations="GET_ALL" disabled />
            </Field>
            <Field label={t('appointment:department')} error={errors.studentDepartment?.message}>
              <SelectDepartments departments={studentDepartment} disabled />
            </Field>
            <div className="md:col-span-2">
              <Divider orientation="center">{t('appointment:appointment')}</Divider>
            </div>
            <Field label={t('appointment:status')} error={errors.appointmentStatus?.message}>
              <SelectAppointmentStatus
                appointmentStatus={appointmentStatus}
                onChange={value => {
                  setValue('appointmentStatus', value);
                  if (errors.appointmentStatus) {
                    trigger('appointmentStatus');
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
                department={expectInspectionDepartmentId}
                onChange={value => {
                  setValue('expectInspectionDepartmentId', value);
                  if (errors.expectInspectionDepartmentId) {
                    trigger('expectInspectionDepartmentId');
                  }
                }}
                disabled={disabledField}
              />
            </Field>
            <Field withRequiredMark label={t('appointment:demand')} error={errors.demand?.message}>
              <SelectMultiple
                value={demand}
                onChange={value => {
                  setValue('demand', value);
                  if (value?.includes('Khác')) {
                    setValue('extraDemand', '');
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
                  value={extraDemand}
                  onChange={event => {
                    setValue('extraDemand', event.target.value);
                    if (errors.extraDemand) {
                      trigger('extraDemand');
                    }
                  }}
                />
              </Field>
            )}
            <Field label={t('appointment:test_type')} error={errors.testType?.message}>
              <Radio.Group
                disabled={disabledField}
                onChange={event => {
                  setValue('testType', event.target.value);
                  if (errors.testType) {
                    trigger('testType');
                  }
                }}
                value={testType}
              >
                <Radio value={TestType.OFFLINE}>{t('appointment:offline')}</Radio>
                <Radio value={TestType.ONLINE}>{t('appointment:online')}</Radio>
              </Radio.Group>
            </Field>
            <Field withRequiredMark label={t('appointment:appointment_date')} error={errors.appointmentDate?.message}>
              <DatePicker
                disabledDate={disablePast}
                disabled={disabledField}
                placeholder={t('appointment:appointment_date')}
                className="w-full"
                value={appointmentDate ? dayjs(appointmentDate) : undefined}
                onChange={value => {
                  setValue('appointmentDate', value?.startOf('day').toISOString());
                  if (errors.appointmentDate) {
                    trigger('appointmentDate');
                  }
                }}
              />
            </Field>
            <Field withRequiredMark label={t('appointment:appointment_time')} error={errors.appointmentTime?.message}>
              <DatePicker
                picker="time"
                format="HH:mm"
                disabledDate={disablePast}
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
              <Divider orientation="center">{t('appointment:supporter')}</Divider>
            </div>
            <Field withRequiredMark label={t('appointment:consultant')} error={errors.consultant?.message}>
              <SelectEmployee
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
                roles={[Role.Admin]}
                allowClear
                placeholder={t('appointment:admin')}
                disabled={disabledField}
                employee={admin}
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
                roles={[Role.Lecturer]}
                allowClear
                placeholder={t('appointment:tester')}
                disabled={disabledField}
                employee={tester}
                onChange={value => {
                  setValue('tester', value);
                  if (errors.tester) {
                    trigger('tester');
                  }
                }}
              />
            </Field>
            <div className="md:col-span-2">
              <Divider orientation="center">{t('appointment:extra_information')}</Divider>
            </div>
            <div className="md:col-span-2">
              <Field label={t('appointment:note')} error={errors.note?.message}>
                <Input.TextArea
                  value={note}
                  onChange={event => {
                    setValue('note', event.target.value);
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
