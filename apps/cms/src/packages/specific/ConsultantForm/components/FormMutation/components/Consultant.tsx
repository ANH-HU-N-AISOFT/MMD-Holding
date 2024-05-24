import { Divider, Input, InputNumber } from 'antd';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Field } from 'reactjs';
import { CourseRoadmapOrCombo } from '../constants';
import { FormValues } from '../FormMutation';
import { SelectSingle } from '~/components/AntCustom/Select';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectFormStatus } from '~/packages/common/SelectVariants/FormStatus/SelectFormStatus';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectCourseCombo } from '~/packages/common/SelectVariants/SelectCourseCombo';
import { SelectCourseRoadmap } from '~/packages/common/SelectVariants/SelectCourseRoadmap';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import { SelectEmployee } from '~/packages/common/SelectVariants/SelectEmployee';
import { SelectPromotions } from '~/packages/common/SelectVariants/SelectPromotions';
import { SelectSaleEmployees } from '~/packages/common/SelectVariants/SelectSaleEmployees';
import { SelectSchool } from '~/packages/common/SelectVariants/SelectSchool';
import { SelectStudent } from '~/packages/common/SelectVariants/SelectStudent';
import { SelectSourceEnum } from '~/packages/common/SelectVariants/SourceEnum/SelectSourceEnum';
import { currencyFormatter } from '~/utils/functions/currency/currencyFormatter';
import { currencyParser } from '~/utils/functions/currency/currencyParser';

interface Props {
  form: ReturnType<typeof useRemixForm<Partial<FormValues>>>;
  disabledField: boolean;
}

export const Consultant = ({ disabledField, form }: Props) => {
  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = form;

  const studentId = watch('studentId');
  const studentPhone = watch('studentPhone');
  const studentSchool = watch('studentSchool');
  const studentSource = watch('studentSource');
  const saleEmployees = watch('saleEmployees');
  const consultantId = watch('consultantId');
  const expectDepartmentId = watch('expectDepartmentId');
  const status = watch('status');
  const type = watch('type');
  const courseRoadMapOrComboId = watch('courseRoadMapOrComboId');
  const numberSessions = watch('numberSessions');
  const sessionDuration = watch('sessionDuration');
  const originPrice = watch('originPrice');
  const salePrice = watch('salePrice');
  const promotionIds = watch('promotionIds');
  const gift = watch('gift');
  const note = watch('note');

  const { t } = useTranslation(['consultant_form']);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Field withRequiredMark label={t('consultant_form:student_name')} error={errors.studentId?.message}>
        <SelectStudent
          disabled={disabledField}
          placeholder={t('consultant_form:student_name')}
          student={studentId}
          onChange={(value, option) => {
            setValue('studentId', value);
            setValue('studentPhone', option?.rawData.phoneNumber);
            setValue('studentSchool', option?.rawData.school?.id);
            setValue('studentSource', option?.rawData.source);
            setValue('saleEmployees', option?.rawData.supporterIds);
            if (errors.studentId) {
              trigger('studentId');
            }
          }}
        />
      </Field>
      <Field label={t('consultant_form:student_phone')}>
        <Input
          value={studentPhone ?? undefined}
          addonBefore={<div>+84</div>}
          disabled
          placeholder={t('consultant_form:student_phone')}
        />
      </Field>
      <Field label={t('consultant_form:student_school')}>
        <SelectSchool
          school={studentSchool ?? undefined}
          cityCode="GET_ALL"
          disabled
          placeholder={t('consultant_form:student_school')}
        />
      </Field>
      <Field label={t('consultant_form:student_source')}>
        <SelectSourceEnum
          sourceEnum={studentSource ?? undefined}
          disabled
          placeholder={t('consultant_form:student_source')}
        />
      </Field>
      <Field label={t('consultant_form:sale_employee')}>
        <SelectSaleEmployees organizations="GET_ALL" saleEmployees={saleEmployees} disabled />
      </Field>
      <Field withRequiredMark label={t('consultant_form:consultantor')} error={errors.consultantId?.message}>
        <SelectEmployee
          roles={[Role.Consultant]}
          disabled={disabledField}
          placeholder={t('consultant_form:consultantor')}
          employee={consultantId}
          onChange={(value, option) => {
            setValue('consultantId', value);
            setValue('expectDepartmentId', option?.rawData.organization?.id);
            if (errors.consultantId) {
              trigger('consultantId');
            }
          }}
        />
      </Field>
      <Field label={t('consultant_form:expect_department')} error={errors.expectDepartmentId?.message}>
        <SelectDepartment
          disabled
          placeholder={t('consultant_form:expect_department')}
          department={expectDepartmentId}
          onChange={value => {
            setValue('expectDepartmentId', value);
            if (errors.expectDepartmentId) {
              trigger('expectDepartmentId');
            }
          }}
        />
      </Field>
      <Field label={t('consultant_form:status')} error={errors.status?.message}>
        <SelectFormStatus
          disabled={disabledField}
          placeholder={t('consultant_form:status')}
          formStatus={status}
          onChange={value => {
            setValue('status', value);
            if (errors.status) {
              trigger('status');
            }
          }}
        />
      </Field>
      <div className="md:col-span-2">
        <Divider>{t('consultant_form:detail')}</Divider>
      </div>
      <Field label={t('consultant_form:type')}>
        <SelectSingle<CourseRoadmapOrCombo>
          options={[
            {
              label: t('consultant_form:combo'),
              searchValue: t('consultant_form:combo'),
              value: CourseRoadmapOrCombo.COMBO,
              rawData: undefined,
            },
            {
              label: t('consultant_form:course_roadmap'),
              searchValue: t('consultant_form:course_roadmap'),
              value: CourseRoadmapOrCombo.COURSE_ROADMAP,
              rawData: undefined,
            },
          ]}
          disabled={disabledField}
          placeholder={t('consultant_form:type')}
          value={type}
          onChange={value => {
            setValue('type', value);
            setValue('courseRoadMapOrComboId', undefined);
            setValue('sessionDuration', undefined);
            setValue('numberSessions', undefined);
            setValue('originPrice', undefined);
          }}
        />
      </Field>
      <Field label={t('consultant_form:course_roadmap_or_combo')} error={errors.courseRoadMapOrComboId?.message}>
        <SelectCourseRoadmap
          className={classNames(type === CourseRoadmapOrCombo.COMBO ? 'hidden' : 'block')}
          disabled={disabledField}
          placeholder={t('consultant_form:course_roadmap_or_combo')}
          courseRoadmap={type === CourseRoadmapOrCombo.COMBO ? undefined : courseRoadMapOrComboId}
          onChange={(value, option) => {
            setValue('courseRoadMapOrComboId', value);
            setValue('sessionDuration', option?.rawData.sessionDuration.toString());
            setValue('numberSessions', option?.rawData.numberSessions);
            setValue('originPrice', option?.rawData.price);
            // FIXME: Công thức
            setValue('salePrice', 0);
            if (errors.courseRoadMapOrComboId) {
              trigger('courseRoadMapOrComboId');
            }
          }}
        />
        <SelectCourseCombo
          className={classNames(type === CourseRoadmapOrCombo.COURSE_ROADMAP ? 'hidden' : 'block')}
          disabled={disabledField}
          placeholder={t('consultant_form:course_roadmap_or_combo')}
          courseCombo={type === CourseRoadmapOrCombo.COURSE_ROADMAP ? undefined : courseRoadMapOrComboId}
          onChange={(value, option) => {
            setValue('courseRoadMapOrComboId', value);
            setValue(
              'sessionDuration',
              option?.rawData?.courseRoadmap
                ?.map(item => {
                  return [item.code, item.sessionDuration].join(' - ');
                })
                .join(', '),
            );
            setValue('numberSessions', option?.rawData.totalNumberSessions);
            setValue('originPrice', option?.rawData.totalPrice);
            // FIXME: Công thức
            setValue('salePrice', 0);
            if (errors.courseRoadMapOrComboId) {
              trigger('courseRoadMapOrComboId');
            }
          }}
        />
      </Field>
      <Field label={t('consultant_form:number_session_with_measure')}>
        <InputNumber
          min={0}
          className="w-full"
          disabled
          placeholder={t('consultant_form:number_session_with_measure')}
          value={numberSessions}
        />
      </Field>
      <Field label={t('consultant_form:session_duration_with_measure')}>
        <Input
          className="w-full"
          disabled
          placeholder={t('consultant_form:session_duration_with_measure')}
          value={sessionDuration}
        />
      </Field>
      <Field label={t('consultant_form:fee_origin_with_measure')}>
        <InputNumber<number>
          min={0}
          className="w-full"
          disabled
          placeholder={t('consultant_form:fee_origin_with_measure')}
          formatter={value => {
            return currencyFormatter(value) ?? '';
          }}
          parser={value => currencyParser(value) ?? 0}
          value={originPrice}
        />
      </Field>
      <Field label={t('consultant_form:promotion')} error={errors.promotionIds?.message}>
        <SelectPromotions
          disabled={disabledField}
          placeholder={t('consultant_form:promotion')}
          promotions={promotionIds}
          onChange={(value, option) => {
            setValue('promotionIds', value);
            setValue(
              'gift',
              option
                ?.map(item => item.rawData.giftDiscount)
                .filter(Boolean)
                .join(', '),
            );
            // FIXME: TÍnh giá
            setValue('salePrice', 0);
            if (errors.promotionIds) {
              trigger('promotionIds');
            }
          }}
        />
      </Field>
      <Field label={t('consultant_form:fee_after_apply_promotion_with_measure')}>
        <InputNumber<number>
          min={0}
          className="w-full"
          disabled
          placeholder={t('consultant_form:fee_after_apply_promotion_with_measure')}
          formatter={value => {
            return currencyFormatter(value) ?? '';
          }}
          parser={value => currencyParser(value) ?? 0}
          value={salePrice}
        />
      </Field>
      <Field label={t('consultant_form:gift')}>
        <Input className="w-full" disabled placeholder={t('consultant_form:gift')} value={gift} />
      </Field>
      <div className="md:col-span-2">
        <Divider>{t('consultant_form:extra_information')}</Divider>
      </div>
      <div className="md:col-span-2">
        <Field label={t('consultant_form:note')} error={errors.note?.message}>
          <Input.TextArea
            rows={6}
            minLength={0}
            maxLength={256}
            showCount
            disabled={disabledField}
            placeholder={t('consultant_form:note')}
            value={note ?? undefined}
            onChange={event => {
              setValue('note', event.target.value);
              if (errors.note) {
                trigger('note');
              }
            }}
          />
        </Field>
      </div>
    </div>
  );
};
