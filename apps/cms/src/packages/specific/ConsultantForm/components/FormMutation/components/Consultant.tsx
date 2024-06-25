import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Checkbox, Divider, Input, InputNumber, Skeleton, Spin, Textarea } from 'reactjs';
import { Field } from 'reactjs';
import { SelectSingle } from 'reactjs';
import { ConsultantForm } from '../../../models/ConsultantForm';
import { calculateGiftPrice } from '../../../utils/calculateGiftPrice';
import { calculateSalePrice } from '../../../utils/calculateSalePrice';
import { SelectFormStatus } from '../../SelectVariants/SelectFormStatus';
import { CourseRoadmapOrCombo } from '../constants';
import { FormValues } from '../FormMutation';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectSchool } from '~/packages/common/SelectVariants/SelectSchool';
import { SelectCourseCombo } from '~/packages/specific/CourseCombo/SelectVariants/SelectCourseCombo';
import { SelectCourseRoadmap } from '~/packages/specific/CourseRoadmap/components/SelectVariants/SelectCourseRoadmap';
import { SelectDepartment } from '~/packages/specific/Department/components/SelectVariants/SelectDepartment';
import { SelectEmployee } from '~/packages/specific/Employee/components/SelectVariants/SelectEmployee';
import { SelectSaleEmployees } from '~/packages/specific/Employee/components/SelectVariants/SelectSaleEmployees';
import { SelectDiscounts } from '~/packages/specific/Promotion/components/SelectVariants/SelectDiscounts';
import { useGetGiftsOfOrganization } from '~/packages/specific/Promotion/hooks/useGetGiftsOfOrganization';
import { SelectSourceEnum } from '~/packages/specific/Student/components/SelectVariants/SelectSourceEnum';
import { SelectStudent } from '~/packages/specific/Student/components/SelectVariants/SelectStudent';
import { currencyFormatter } from '~/utils/functions/currency/currencyFormatter';
import { currencyParser } from '~/utils/functions/currency/currencyParser';

interface Props {
  form: ReturnType<typeof useRemixForm<Partial<FormValues>>>;
  disabledField: boolean;
  consultantForm: ConsultantForm | undefined;
}

export const Consultant = ({ disabledField, form, consultantForm }: Props) => {
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
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
          organizationId={expectDepartmentId}
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
          extraDepartments={consultantForm?.learningOrganization ? [consultantForm.learningOrganization] : []}
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
        <Divider>
          <div className="text-base font-semibold">{t('consultant_form:detail')}</div>
        </Divider>
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
        <InputNumber
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
        <InputNumber
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
                    onChange={checked => {
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
        <Divider>
          <div className="text-base font-semibold">{t('consultant_form:extra_information')}</div>
        </Divider>
      </div>
      <div className="md:col-span-2">
        <Field label={t('consultant_form:note')} error={errors.note?.message}>
          <Textarea
            rows={6}
            showCount
            maxLength={256}
            disabled={disabledField}
            placeholder={t('consultant_form:note')}
            value={note ?? undefined}
            onChange={value => {
              setValue('note', value);
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
