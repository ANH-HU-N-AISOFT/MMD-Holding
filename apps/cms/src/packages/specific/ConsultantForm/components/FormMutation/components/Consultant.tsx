import { Checkbox, Divider, Input, InputNumber, Skeleton, Spin } from 'antd';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Field } from 'reactjs';
import { calculateGiftPrice } from '../../../utils/calculateGiftPrice';
import { calculateSalePrice } from '../../../utils/calculateSalePrice';
import { CourseRoadmapOrCombo } from '../constants';
import { FormValues } from '../FormMutation';
import { SelectSingle } from '~/components/AntCustom/Select';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { SelectFormStatus } from '~/packages/common/SelectVariants/FormStatus/SelectFormStatus';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectCourseCombo } from '~/packages/common/SelectVariants/SelectCourseCombo';
import { SelectCourseRoadmap } from '~/packages/common/SelectVariants/SelectCourseRoadmap';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import { SelectDiscounts } from '~/packages/common/SelectVariants/SelectDiscounts';
import { SelectEmployee } from '~/packages/common/SelectVariants/SelectEmployee';
import { SelectSaleEmployees } from '~/packages/common/SelectVariants/SelectSaleEmployees';
import { SelectSchool } from '~/packages/common/SelectVariants/SelectSchool';
import { SelectStudent } from '~/packages/common/SelectVariants/SelectStudent';
import { SelectSourceEnum } from '~/packages/common/SelectVariants/SourceEnum/SelectSourceEnum';
import { useGetGiftsOfOrganization } from '~/packages/specific/Promotion/hooks/useGetGiftsOfOrganization';
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
  const displayStudentPhone = watch('displayStudentPhone');
  const displayStudentSchool = watch('displayStudentSchool');
  const displayStudentSource = watch('displayStudentSource');
  const displaySaleEmployees = watch('displaySaleEmployees');
  const consultantId = watch('consultantId');
  const expectDepartmentId = watch('expectDepartmentId');
  const status = watch('status');
  const directionalType = watch('directionalType');
  const courseRoadMapOrComboId = watch('courseRoadMapOrComboId');
  const displayNumberSessions = watch('displayNumberSessions');
  const displaySessionDuration = watch('displaySessionDuration');
  const calculateNDisplayOriginPrice = watch('calculateNDisplayOriginPrice');
  const displaySalePrice = watch('displaySalePrice');
  const promotionIds = watch('promotionIds');
  const calculatePromotions = watch('calculatePromotions') ?? [];
  const gifts = watch('gifts') ?? [];
  const note = watch('note');
  const displayGiftPrice = watch('displayGiftPrice');
  const calculateQuantityCourseRoadMap = watch('calculateQuantityCourseRoadMap');

  const { loading, data, setOrganizationId } = useGetGiftsOfOrganization({ defaultOrganization: expectDepartmentId });

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
      <Field label={t('consultant_form:student_phone')}>
        <Input
          value={displayStudentPhone ?? undefined}
          addonBefore={<div>+84</div>}
          disabled
          placeholder={t('consultant_form:student_phone')}
        />
      </Field>
      <Field label={t('consultant_form:student_school')}>
        <SelectSchool
          school={displayStudentSchool ?? undefined}
          cityCode="GET_ALL"
          disabled
          placeholder={t('consultant_form:student_school')}
        />
      </Field>
      <Field label={t('consultant_form:student_source')}>
        <SelectSourceEnum
          sourceEnum={displayStudentSource ?? undefined}
          disabled
          placeholder={t('consultant_form:student_source')}
        />
      </Field>
      <Field label={t('consultant_form:sale_employee')}>
        <SelectSaleEmployees organizations="GET_ALL" saleEmployees={displaySaleEmployees ?? undefined} disabled />
      </Field>
      <Field withRequiredMark label={t('consultant_form:consultantor')} error={errors.consultantId?.message}>
        <SelectEmployee
          organizationId="GET_ALL"
          emptyText={t('consultant_form:must_select_expect_department')}
          roles={[Role.Consultant]}
          disabled={disabledField}
          placeholder={t('consultant_form:consultantor')}
          employee={consultantId}
          onChange={value => {
            setValue('consultantId', value);
            if (errors.consultantId) {
              trigger('consultantId');
            }
          }}
        />
      </Field>
      <Field label={t('consultant_form:expect_department')} error={errors.expectDepartmentId?.message}>
        <SelectDepartment
          disabled={disabledField}
          placeholder={t('consultant_form:expect_department')}
          department={expectDepartmentId}
          onChange={value => {
            setOrganizationId(value);
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
          value={directionalType}
          onChange={value => {
            setValue('directionalType', value);
            setValue('calculateQuantityCourseRoadMap', undefined);
            setValue('courseRoadMapOrComboId', undefined);
            setValue('displaySessionDuration', undefined);
            setValue('displayNumberSessions', undefined);
            setValue('calculateNDisplayOriginPrice', undefined);
            setValue('displayGiftPrice', undefined);
            setValue('displaySalePrice', undefined);
          }}
        />
      </Field>
      <Field label={t('consultant_form:course_roadmap_or_combo')} error={errors.courseRoadMapOrComboId?.message}>
        <SelectCourseRoadmap
          className={classNames(directionalType === CourseRoadmapOrCombo.COMBO ? 'hidden' : 'block')}
          disabled={disabledField}
          placeholder={t('consultant_form:course_roadmap_or_combo')}
          courseRoadmap={directionalType === CourseRoadmapOrCombo.COMBO ? undefined : courseRoadMapOrComboId}
          onChange={(value, option) => {
            const originPrice = option?.rawData.price;
            const quantityCourseRoadMap = 1;
            const displaySalePrice = calculateSalePrice({
              calculatePromotions,
              calculateNDisplayOriginPrice: originPrice,
            });
            setValue('calculateQuantityCourseRoadMap', quantityCourseRoadMap);
            setValue('courseRoadMapOrComboId', value);
            setValue('displaySessionDuration', option?.rawData.sessionDuration.toString());
            setValue('displayNumberSessions', option?.rawData.numberSessions);
            setValue('calculateNDisplayOriginPrice', originPrice);
            setValue(
              'displayGiftPrice',
              calculateGiftPrice({
                displaySalePrice,
                calculateQuantityCourseRoadMap: quantityCourseRoadMap,
              }),
            );
            setValue('displaySalePrice', displaySalePrice);
            if (errors.courseRoadMapOrComboId) {
              trigger('courseRoadMapOrComboId');
            }
          }}
        />
        <SelectCourseCombo
          className={classNames(directionalType === CourseRoadmapOrCombo.COURSE_ROADMAP ? 'hidden' : 'block')}
          disabled={disabledField}
          placeholder={t('consultant_form:course_roadmap_or_combo')}
          courseCombo={directionalType === CourseRoadmapOrCombo.COURSE_ROADMAP ? undefined : courseRoadMapOrComboId}
          onChange={(value, option) => {
            const originPrice = option?.rawData.totalPrice;
            const quantityCourseRoadMap = option?.rawData?.courseRoadmap?.length;
            const displaySalePrice = calculateSalePrice({
              calculatePromotions,
              calculateNDisplayOriginPrice: originPrice,
            });
            setValue('courseRoadMapOrComboId', value);
            setValue('calculateQuantityCourseRoadMap', quantityCourseRoadMap);
            setValue(
              'displaySessionDuration',
              option?.rawData?.courseRoadmap
                ?.map(item => {
                  return [item.code, item.sessionDuration].join(' - ');
                })
                .join(', '),
            );
            setValue('displayNumberSessions', option?.rawData.totalNumberSessions);
            setValue('calculateNDisplayOriginPrice', originPrice);
            setValue(
              'displayGiftPrice',
              calculateGiftPrice({
                displaySalePrice,
                calculateQuantityCourseRoadMap: quantityCourseRoadMap,
              }),
            );
            setValue('displaySalePrice', displaySalePrice);
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
          value={displayNumberSessions}
        />
      </Field>
      <Field label={t('consultant_form:session_duration_with_measure')}>
        <Input
          className="w-full"
          disabled
          placeholder={t('consultant_form:session_duration_with_measure')}
          value={displaySessionDuration}
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
          value={calculateNDisplayOriginPrice}
        />
      </Field>
      <Field label={t('consultant_form:promotion')} error={errors.promotionIds?.message}>
        <SelectDiscounts
          emptyText={t('consultant_form:must_select_expect_department')}
          organizationId={expectDepartmentId}
          disabled={disabledField}
          placeholder={t('consultant_form:promotion')}
          discounts={promotionIds ?? undefined}
          onChange={(value, option) => {
            const promotions = (option ?? [])?.map(item => ({
              feeDiscount: item.rawData.feeDiscount,
              percentageDiscount: item.rawData.percentageDiscount,
              programType: item.rawData.programType,
            }));
            const displaySalePrice = calculateSalePrice({
              calculatePromotions: promotions,
              calculateNDisplayOriginPrice,
            });
            setValue('promotionIds', value);
            setValue('calculatePromotions', promotions);
            setValue('displaySalePrice', displaySalePrice);
            setValue(
              'displayGiftPrice',
              calculateGiftPrice({
                displaySalePrice,
                calculateQuantityCourseRoadMap,
              }),
            );
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
          value={displaySalePrice}
        />
      </Field>
      <Field label={t('consultant_form:gift')}>
        <Input
          value={currencyFormatter(displayGiftPrice)}
          suffix="VNĐ"
          className="w-full"
          disabled
          placeholder={t('consultant_form:gift')}
        />
      </Field>
      <div className="md:col-span-2">
        <Field label={t('consultant_form:gift2')} error={errors.gifts?.message} tagName="div">
          <Spin spinning={loading}>
            <div className={classNames('grid-cols-1 gap-2', loading ? 'grid' : 'hidden')}>
              <Skeleton.Input />
              <Skeleton.Input />
              <Skeleton.Input />
            </div>
            {!expectDepartmentId && <div>{t('consultant_form:must_select_expect_department')}</div>}
            <div className="grid grid-cols-1 gap-2">
              {(expectDepartmentId ? data?.items : [])?.map(item => {
                return (
                  <Checkbox
                    disabled={disabledField}
                    onChange={event => {
                      const checked = event.target.checked;
                      if (checked) {
                        setValue('gifts', gifts.concat(item.id));
                      } else {
                        setValue(
                          'gifts',
                          gifts.filter(gift => gift !== item.id),
                        );
                      }
                    }}
                    checked={gifts?.includes(item.id)}
                    key={item.id}
                  >
                    {item.giftDiscount}
                  </Checkbox>
                );
              })}
            </div>
          </Spin>
        </Field>
      </div>
      <div className="md:col-span-2">
        <Divider>{t('consultant_form:extra_information')}</Divider>
      </div>
      <div className="md:col-span-2">
        <Field label={t('consultant_form:note')} error={errors.note?.message}>
          <Input.TextArea
            rows={6}
            showCount
            maxLength={256}
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
