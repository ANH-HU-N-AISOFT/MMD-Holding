import { DatePicker, Divider, Input, Radio } from 'antd';
import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDeepCompareEffect } from 'reactjs';
import { TypeOf } from 'zod';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Field } from '~/components/Field/Field';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectClassType } from '~/packages/common/SelectVariants/ClassType/SelectClassType';
import { LearningType } from '~/packages/common/SelectVariants/LearningType/constants/LearningType';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectCourseRoadmap } from '~/packages/common/SelectVariants/SelectCourseRoadmap';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import { SelectEmployee } from '~/packages/common/SelectVariants/SelectEmployee';
import { SelectSaleEmployees } from '~/packages/common/SelectVariants/SelectSaleEmployees';
import { SelectSchool } from '~/packages/common/SelectVariants/SelectSchool';
import { SelectStudent } from '~/packages/common/SelectVariants/SelectStudent';
import { SelectSourceEnum } from '~/packages/common/SelectVariants/SourceEnum/SelectSourceEnum';
import { SelectTrialStatus } from '~/packages/common/SelectVariants/TrialStatus/SelectTrialStatus';
import { disablePast } from '~/utils/functions/disableDatePicker';

export interface FormValues extends TypeOf<ReturnType<typeof getFormMutationSchema>> {}

interface Props {
  uid: string;
  isSubmiting: boolean;
  defaultValues?: Partial<FormValues>;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const FormMutation = ({ uid, defaultValues = {}, fieldsError = {}, isSubmiting, onSubmit, disabled }: Props) => {
  const { t } = useTranslation(['common', 'trial']);

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
    defaultValues,
    resolver: getFormMutationResolver(t as TFunction<['common', 'trial']>),
  });

  const studentId = watch('studentId');
  const displayStudentPhone = watch('displayStudentPhone');
  const displayStudentSchool = watch('displayStudentSchool');
  const displayStudentSource = watch('displayStudentSource');
  const displaySaleEmployees = watch('displaySaleEmployees');
  const consultantId = watch('consultantId');

  const status = watch('status');
  const classType = watch('classType');
  const courseRoadmapId = watch('courseRoadmapId');
  const learningOrganizationId = watch('learningOrganizationId');
  const learningDate = watch('learningDate');
  const learningTime = watch('learningTime');
  const learningType = watch('learningType');
  const lectureId = watch('lectureId');
  const adminId = watch('adminId');
  const notes = watch('notes');

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
      reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <div>
      <Form method="POST" id={uid} onSubmit={handleSubmit}>
        <BoxFields>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <Field withRequiredMark label={t('trial:student_name')} error={errors.studentId?.message}>
              <SelectStudent
                disabled={disabledField}
                placeholder={t('trial:student_name')}
                student={studentId}
                onChange={(value, option) => {
                  setValue('studentId', value);
                  setValue('displayStudentPhone', option?.rawData.phoneNumber);
                  setValue('displayStudentSchool', option?.rawData.school?.id);
                  setValue('displayStudentSource', option?.rawData.source);
                  setValue('displaySaleEmployees', option?.rawData.supporterIds);
                  if (errors.studentId) {
                    trigger('studentId');
                  }
                }}
              />
            </Field>
            <Field label={t('trial:student_phone')}>
              <Input
                value={displayStudentPhone ?? undefined}
                addonBefore={<div>+84</div>}
                disabled
                placeholder={t('trial:student_phone')}
              />
            </Field>
            <Field label={t('trial:student_school')}>
              <SelectSchool
                school={displayStudentSchool ?? undefined}
                cityCode="GET_ALL"
                disabled
                placeholder={t('trial:student_school')}
              />
            </Field>
            <Field label={t('trial:student_source')}>
              <SelectSourceEnum
                sourceEnum={displayStudentSource ?? undefined}
                disabled
                placeholder={t('trial:student_source')}
              />
            </Field>
            <Field label={t('trial:sale_employee')}>
              <SelectSaleEmployees organizations="GET_ALL" saleEmployees={displaySaleEmployees ?? undefined} disabled />
            </Field>
            <Field withRequiredMark label={t('trial:consultantor')} error={errors.consultantId?.message}>
              <SelectEmployee
                roles={[Role.Consultant]}
                disabled={disabledField}
                placeholder={t('trial:consultantor')}
                employee={consultantId}
                onChange={value => {
                  setValue('consultantId', value);
                  if (errors.consultantId) {
                    trigger('consultantId');
                  }
                }}
              />
            </Field>
            <div className="md:col-span-2">
              <Divider orientation="center">{t('trial:detail')}</Divider>
            </div>
            <Field label={t('trial:status')} error={errors.status?.message}>
              <SelectTrialStatus
                allowClear={false}
                trialStatus={status ?? undefined}
                onChange={value => {
                  setValue('status', value);
                  if (errors.status) {
                    trigger('status');
                  }
                }}
                disabled={disabledField}
                placeholder={t('trial:status')}
              />
            </Field>
            <Field label={t('trial:class_type')} error={errors.classType?.message}>
              <SelectClassType
                allowClear={false}
                classType={classType ?? undefined}
                onChange={value => {
                  setValue('classType', value);
                  if (errors.classType) {
                    trigger('classType');
                  }
                }}
                disabled={disabledField}
                placeholder={t('trial:class_type')}
              />
            </Field>
            <Field withRequiredMark label={t('trial:course_roadmap')} error={errors.courseRoadmapId?.message}>
              <SelectCourseRoadmap
                allowClear={false}
                courseRoadmap={courseRoadmapId ?? undefined}
                onChange={value => {
                  setValue('courseRoadmapId', value);
                  if (errors.courseRoadmapId) {
                    trigger('courseRoadmapId');
                  }
                }}
                disabled={disabledField}
                placeholder={t('trial:course_roadmap')}
              />
            </Field>
            <Field withRequiredMark label={t('trial:expect_department')} error={errors.learningOrganizationId?.message}>
              <SelectDepartment
                allowClear={false}
                department={learningOrganizationId ?? undefined}
                onChange={value => {
                  setValue('learningOrganizationId', value);
                  if (errors.learningOrganizationId) {
                    trigger('learningOrganizationId');
                  }
                }}
                disabled={disabledField}
                placeholder={t('trial:expect_department')}
              />
            </Field>
            <Field label={t('trial:learning_date')} error={errors.learningDate?.message}>
              <DatePicker
                disabledDate={disablePast}
                disabled={disabledField}
                placeholder={t('trial:learning_date')}
                className="w-full"
                value={learningDate ? dayjs(learningDate) : undefined}
                onChange={value => {
                  setValue('learningDate', value?.startOf('day').toISOString());
                  if (errors.learningDate) {
                    trigger('learningDate');
                  }
                }}
              />
            </Field>
            <Field label={t('trial:learning_time')} error={errors.learningTime?.message}>
              <DatePicker
                picker="time"
                format="HH:mm"
                disabledDate={disablePast}
                disabled={disabledField}
                placeholder={t('trial:learning_time')}
                className="w-full"
                value={learningTime ? dayjs(learningTime, 'HH:mm') : undefined}
                onChange={value => {
                  setValue('learningTime', value?.format('HH:mm'));
                  if (errors.learningTime) {
                    trigger('learningTime');
                  }
                }}
              />
            </Field>
            <div className="md:col-span-2">
              <Field label={t('trial:learning_type')} error={errors.learningType?.message}>
                <Radio.Group
                  disabled={disabledField}
                  onChange={event => {
                    setValue('learningType', event.target.value);
                    if (errors.learningType) {
                      trigger('learningType');
                    }
                  }}
                  value={learningType}
                >
                  <Radio value={LearningType.OFFLINE}>{t('trial:offline')}</Radio>
                  <Radio value={LearningType.ONLINE}>{t('trial:online')}</Radio>
                </Radio.Group>
              </Field>
            </div>
            <Field label={t('trial:lecture')} error={errors.lectureId?.message}>
              <SelectEmployee
                roles={[Role.Admin]}
                allowClear
                placeholder={t('trial:lecture')}
                disabled={disabledField}
                employee={lectureId ?? undefined}
                onChange={value => {
                  setValue('lectureId', value);
                  if (errors.lectureId) {
                    trigger('lectureId');
                  }
                }}
              />
            </Field>
            <Field label={t('trial:admin')} error={errors.adminId?.message}>
              <SelectEmployee
                roles={[Role.Admin]}
                allowClear
                placeholder={t('trial:admin')}
                disabled={disabledField}
                employee={adminId ?? undefined}
                onChange={value => {
                  setValue('adminId', value);
                  if (errors.adminId) {
                    trigger('adminId');
                  }
                }}
              />
            </Field>
            <div className="md:col-span-2">
              <Divider orientation="center">{t('trial:extra_information')}</Divider>
            </div>
            <div className="md:col-span-2">
              <Field label={t('trial:notes')} error={errors.notes?.message}>
                <Input.TextArea
                  rows={6}
                  minLength={0}
                  maxLength={256}
                  showCount
                  value={notes ?? undefined}
                  onChange={event => {
                    setValue('notes', event.target.value);
                    if (errors.notes) {
                      trigger('notes');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('trial:notes')}
                />
              </Field>
            </div>
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
