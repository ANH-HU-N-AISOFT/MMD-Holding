import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Input, Radio, Textarea } from 'reactjs';
import { SingleDayPicker, SingleTimePicker, disableDaysPast, useDeepCompareEffect } from 'reactjs';
import { TypeOf } from 'zod';
import { getStudyModeMappingToLabels } from '../../constants/StudyModeMappingToLabels';
import { StudyMode } from '../../models/StudyMode';
import { TrialRequest } from '../../models/TrialRequest';
import { SelectDemoType } from '../SelectVariants/SelectDemoType';
import { SelectTrialRequestStatus } from '../SelectVariants/SelectTrialRequestStatus';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields/BoxFields';
import { Field } from '~/components/Field/Field';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectSchool } from '~/packages/extends/Location/components/SelectVariants/SelectSchool';
import { SelectCourseRoadmap } from '~/packages/specific/CourseRoadmap/components/SelectVariants/SelectCourseRoadmap';
import { SelectDepartment } from '~/packages/specific/Department/components/SelectVariants/SelectDepartment';
import { SelectEmployee } from '~/packages/specific/Employee/components/SelectVariants/SelectEmployee';
import { SelectEmployees } from '~/packages/specific/Employee/components/SelectVariants/SelectEmployees';
import { SelectSourceEnum } from '~/packages/specific/Student/components/SelectVariants/SelectSourceEnum';
import { SelectStudent } from '~/packages/specific/Student/components/SelectVariants/SelectStudent';

export interface FormValues extends TypeOf<ReturnType<typeof getFormMutationSchema>> {}

interface Props {
  uid: string;
  isSubmiting: boolean;
  defaultValues?: Partial<FormValues>;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
  isEdit?: boolean;
  trialRequest: TrialRequest | undefined;
}

export const FormMutation = ({
  uid,
  defaultValues = {},
  fieldsError = {},
  isSubmiting,
  onSubmit,
  disabled,
  isEdit = false,
  trialRequest,
}: Props) => {
  const { t } = useTranslation(['common', 'trial_request']);
  const StudyModeMappingToLabels = useMemo(() => {
    return getStudyModeMappingToLabels(t as unknown as TFunction<['trial_request']>);
  }, [t]);

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
    resolver: getFormMutationResolver(t),
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
  const studyMode = watch('studyMode');
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
            <Field withRequiredMark label={t('trial_request:student_name')} error={errors.studentId?.message}>
              <SelectStudent
                scope="allSystem"
                disabled={disabledField}
                placeholder={t('trial_request:student_name')}
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
            <Field label={t('trial_request:student_phone')}>
              <Input
                value={displayStudentPhone ?? undefined}
                addonBefore={<div>+84</div>}
                disabled
                placeholder={t('trial_request:student_phone')}
              />
            </Field>
            <Field label={t('trial_request:student_school')}>
              <SelectSchool
                onChange={() => undefined}
                school={displayStudentSchool ?? undefined}
                scope="allSystem"
                disabled
                placeholder={t('trial_request:student_school')}
              />
            </Field>
            <Field label={t('trial_request:student_source')}>
              <SelectSourceEnum
                sourceEnum={displayStudentSource ?? undefined}
                disabled
                placeholder={t('trial_request:student_source')}
              />
            </Field>
            <Field label={t('trial_request:sale_employee')}>
              <SelectEmployees
                scope="allSystem"
                disabled
                onChange={() => undefined}
                employees={displaySaleEmployees ?? undefined}
              />
            </Field>
            <Field withRequiredMark label={t('trial_request:consultantor')} error={errors.consultantId?.message}>
              <SelectEmployee
                scope="inADepartment"
                organizationIds={[learningOrganizationId, getSession()?.profile?.organizationId].filter(
                  (item): item is string => !!item,
                )}
                emptyText={t('trial_request:must_select_expect_department')}
                role={Role.Consultant}
                disabled={disabledField}
                placeholder={t('trial_request:consultantor')}
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
              <Divider orientation="center">
                <div className="text-base font-semibold">{t('trial_request:detail')}</div>
              </Divider>
            </div>
            <Field withRequiredMark label={t('trial_request:status')} error={errors.status?.message}>
              <SelectTrialRequestStatus
                allowClear={false}
                trialRequestStatus={status ?? undefined}
                onChange={value => {
                  setValue('status', value);
                  if (errors.status) {
                    trigger('status');
                  }
                }}
                disabled={disabledField}
                placeholder={t('trial_request:status')}
              />
            </Field>
            <Field withRequiredMark label={t('trial_request:demo_type')} error={errors.classType?.message}>
              <SelectDemoType
                allowClear={false}
                demoType={classType ?? undefined}
                onChange={value => {
                  setValue('classType', value);
                  if (errors.classType) {
                    trigger('classType');
                  }
                }}
                disabled={disabledField}
                placeholder={t('trial_request:demo_type')}
              />
            </Field>
            <Field withRequiredMark label={t('trial_request:course_roadmap')} error={errors.courseRoadmapId?.message}>
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
                placeholder={t('trial_request:course_roadmap')}
              />
            </Field>
            <Field
              withRequiredMark
              label={t('trial_request:expect_department')}
              error={errors.learningOrganizationId?.message}
            >
              <SelectDepartment
                scope="allSystem"
                extraDepartments={trialRequest?.learningOrganization ? [trialRequest.learningOrganization] : []}
                allowClear={false}
                department={learningOrganizationId ?? undefined}
                onChange={value => {
                  setValue('learningOrganizationId', value);
                  if (errors.learningOrganizationId) {
                    trigger('learningOrganizationId');
                  }
                }}
                disabled={disabledField}
                placeholder={t('trial_request:expect_department')}
              />
            </Field>
            <Field label={t('trial_request:learning_date')} error={errors.learningDate?.message}>
              <SingleDayPicker
                disabledDate={isEdit ? undefined : disableDaysPast}
                disabled={disabledField}
                placeholder={t('trial_request:learning_date')}
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
            <Field label={t('trial_request:learning_time')} error={errors.learningTime?.message}>
              <SingleTimePicker
                format="HH:mm"
                disabled={disabledField}
                placeholder={t('trial_request:learning_time')}
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
              <Field label={t('trial_request:study_mode')} error={errors.studyMode?.message}>
                <Radio
                  items={[
                    { value: StudyMode.Offline, label: StudyModeMappingToLabels[StudyMode.Offline] },
                    { value: StudyMode.Online, label: StudyModeMappingToLabels[StudyMode.Online] },
                  ]}
                  disabled={disabledField}
                  value={studyMode}
                  onChange={value => {
                    setValue('studyMode', value);
                    if (errors.studyMode) {
                      trigger('studyMode');
                    }
                  }}
                />
              </Field>
            </div>
            <Field label={t('trial_request:lecture')} error={errors.lectureId?.message}>
              <SelectEmployee
                scope="inADepartment"
                organizationIds={[learningOrganizationId, getSession()?.profile?.organizationId].filter(
                  (item): item is string => !!item,
                )}
                emptyText={t('trial_request:must_select_expect_department')}
                role={Role.Lecturer}
                allowClear
                placeholder={t('trial_request:lecture')}
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
            <Field label={t('trial_request:admin')} error={errors.adminId?.message}>
              <SelectEmployee
                scope="inADepartment"
                organizationIds={[learningOrganizationId, getSession()?.profile?.organizationId].filter(
                  (item): item is string => !!item,
                )}
                emptyText={t('trial_request:must_select_expect_department')}
                role={Role.Admin}
                allowClear
                placeholder={t('trial_request:admin')}
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
              <Divider orientation="center">
                <div className="text-base font-semibold">{t('trial_request:extra_information')}</div>
              </Divider>
            </div>
            <div className="md:col-span-2">
              <Field label={t('trial_request:notes')} error={errors.notes?.message}>
                <Textarea
                  rows={6}
                  showCount
                  maxLength={256}
                  value={notes ?? undefined}
                  onChange={value => {
                    setValue('notes', value);
                    if (errors.notes) {
                      trigger('notes');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('trial_request:notes')}
                />
              </Field>
            </div>
          </div>
        </BoxFields>
      </Form>
    </div>
  );
};
