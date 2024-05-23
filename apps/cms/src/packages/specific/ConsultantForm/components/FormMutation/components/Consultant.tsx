import { Checkbox, Divider, Input, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { Field } from 'reactjs';
import { FormValues } from '../FormMutation';
import { SelectSingle } from '~/components/AntCustom/Select';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectCourseRoadmap } from '~/packages/common/SelectVariants/SelectCourseRoadmap';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import { SelectEmployee } from '~/packages/common/SelectVariants/SelectEmployee';
import { SelectSchool } from '~/packages/common/SelectVariants/SelectSchool';
import { SelectStudent } from '~/packages/common/SelectVariants/SelectStudent';
import { SelectSourceEnum } from '~/packages/common/SelectVariants/SourceEnum/SelectSourceEnum';
import { currencyFormatter } from '~/utils/functions/currency/currencyFormatter';
import { currencyParser } from '~/utils/functions/currency/currencyParser';

interface Props {
  form: ReturnType<typeof useRemixForm<Partial<FormValues>>>;
  disabledField: boolean;
}

export const Consultant = ({ disabledField }: Props) => {
  const { t } = useTranslation(['consultant_form']);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Field withRequiredMark label={t('consultant_form:student_name')}>
        <SelectStudent disabled={disabledField} placeholder={t('consultant_form:student_name')} />
      </Field>
      <Field label={t('consultant_form:student_phone')}>
        <Input addonBefore={<div>+84</div>} disabled={disabledField} placeholder={t('consultant_form:student_phone')} />
      </Field>
      <Field label={t('consultant_form:student_school')}>
        <SelectSchool cityCode="GET_ALL" disabled={disabledField} placeholder={t('consultant_form:student_school')} />
      </Field>
      <Field label={t('consultant_form:student_source')}>
        <SelectSourceEnum disabled={disabledField} placeholder={t('consultant_form:student_source')} />
      </Field>
      <Field label={t('consultant_form:sale_employee')}>
        <SelectEmployee roles={[Role.Sale]} disabled={disabledField} placeholder={t('consultant_form:sale_employee')} />
      </Field>
      <Field withRequiredMark label={t('consultant_form:consultantor')}>
        <SelectEmployee
          roles={[Role.Consultant]}
          disabled={disabledField}
          placeholder={t('consultant_form:consultantor')}
        />
      </Field>
      <Field label={t('consultant_form:expect_department')}>
        <SelectDepartment disabled={disabledField} placeholder={t('consultant_form:expect_department')} />
      </Field>
      <Field label={t('consultant_form:status')}>
        <SelectSingle options={[]} disabled={disabledField} placeholder={t('consultant_form:status')} />
      </Field>
      <div className="md:col-span-2">
        <Divider>{t('consultant_form:detail')}</Divider>
      </div>
      <Field label={t('consultant_form:type')}>
        <SelectSingle options={[]} disabled={disabledField} placeholder={t('consultant_form:type')} />
      </Field>
      <Field label={t('consultant_form:course_roadmap')}>
        <SelectCourseRoadmap disabled={disabledField} placeholder={t('consultant_form:course_roadmap')} />
      </Field>
      <Field label={t('consultant_form:number_session_with_measure')}>
        <InputNumber
          min={0}
          className="w-full"
          disabled
          placeholder={t('consultant_form:number_session_with_measure')}
        />
      </Field>
      <Field label={t('consultant_form:session_duration_with_measure')}>
        <Input className="w-full" disabled placeholder={t('consultant_form:session_duration_with_measure')} />
      </Field>
      <Field label={t('consultant_form:fee_origin_with_measure')}>
        <InputNumber<number>
          min={0}
          className="w-full"
          disabled
          placeholder={t('consultant_form:fee_origin_with_measure')}
          formatter={value => {
            const formatter = currencyFormatter();
            return formatter(value) ?? '';
          }}
          parser={value => currencyParser(value) ?? 0}
        />
      </Field>
      <Field label={t('consultant_form:discount')}>
        <SelectSingle options={[]} disabled={disabledField} placeholder={t('consultant_form:discount')} />
      </Field>
      <Field label={t('consultant_form:fee_discounted_with_measure')}>
        <InputNumber<number>
          min={0}
          className="w-full"
          disabled
          placeholder={t('consultant_form:fee_discounted_with_measure')}
          formatter={value => {
            const formatter = currencyFormatter();
            return formatter(value) ?? '';
          }}
          parser={value => currencyParser(value) ?? 0}
        />
      </Field>
      <Field label={t('consultant_form:fee_gift_with_measure')}>
        <InputNumber<number>
          min={0}
          className="w-full"
          disabled
          placeholder={t('consultant_form:fee_gift_with_measure')}
          formatter={value => {
            const formatter = currencyFormatter();
            return formatter(value) ?? '';
          }}
          parser={value => currencyParser(value) ?? 0}
        />
      </Field>
      <Field label={t('consultant_form:gift')}>
        <Checkbox>Chương trình kiểm tra trình độ theo chuẩn IELTS quốc tế</Checkbox>
        <Checkbox>Bộ giáo trình độc quyền của IELTS Arena chuẩn quốc tế</Checkbox>
      </Field>
      <div className="md:col-span-2">
        <Divider>{t('consultant_form:extra_information')}</Divider>
      </div>
      <div className="md:col-span-2">
        <Field label={t('consultant_form:note')}>
          <Input.TextArea
            rows={6}
            minLength={0}
            maxLength={256}
            showCount
            disabled={disabledField}
            placeholder={t('consultant_form:note')}
          />
        </Field>
      </div>
    </div>
  );
};
