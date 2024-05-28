import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/@base/utils/getCountForFilterDrawer';
import { SelectClassType } from '~/packages/common/SelectVariants/ClassType/SelectClassType';
import { SelectLearningType } from '~/packages/common/SelectVariants/LearningType/SelectLearningType';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectCourseRoadmap } from '~/packages/common/SelectVariants/SelectCourseRoadmap';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import { SelectEmployee } from '~/packages/common/SelectVariants/SelectEmployee';
import { SelectTrialStatus } from '~/packages/common/SelectVariants/TrialStatus/SelectTrialStatus';

export interface FormFilterValues
  extends Pick<
    ListingSearchParams,
    | 'status'
    | 'adminId'
    | 'classType'
    | 'consultantorId'
    | 'courseRoadmapId'
    | 'departmentId'
    | 'learningType'
    | 'lectureId'
  > {}

interface FormFilterProps {
  onFilter?: (formFilterValues: FormFilterValues) => void;
  onResetFilter?: () => void;
  isSubmiting?: boolean;
  formFilterValues?: FormFilterValues;
  searchValue?: string;
  onSearch?: (value: string) => void;
  containerClassName?: string;
}

const UID = 'FORM_FILTER_LISTING_TRIALS';
export const FormSearchNFilter = ({
  formFilterValues = {},
  searchValue,
  onSearch,
  isSubmiting,
  onResetFilter,
  onFilter,
  containerClassName,
}: FormFilterProps) => {
  const { t } = useTranslation(['common', 'trial']);

  const {
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useRemixForm<FormFilterValues>({
    mode: 'onSubmit',
    defaultValues: formFilterValues,
    resolver: zodResolver(lisitngUrlSearchParamsSchema),
    submitHandlers: {
      onValid: onFilter,
    },
  });
  const status = watch('status');
  const courseRoadmapId = watch('courseRoadmapId');
  const classType = watch('classType');
  const learningType = watch('learningType');
  const departmentId = watch('departmentId');
  const consultantorId = watch('consultantorId');
  const adminId = watch('adminId');
  const lectureId = watch('lectureId');

  const handleResetFormFilterValues = () => {
    reset({ status: undefined });
    onResetFilter?.();
  };

  useDeepCompareEffect(() => {
    reset(formFilterValues);
  }, [formFilterValues]);

  return (
    <SearchNFilter
      inputClassName="md:!max-w-[450px]"
      containerClassName={containerClassName}
      isSubmiting={isSubmiting}
      search={{
        placeholder: t('trial:search_placeholder'),
        searchValue: searchValue,
        onSearch: onSearch,
      }}
      filter={{
        uid: UID,
        onReset: handleResetFormFilterValues,
        count: getCountForFilterDrawer({
          fieldKeys: [
            'status',
            'adminId',
            'classType',
            'consultantorId',
            'courseRoadmapId',
            'departmentId',
            'learningType',
            'lectureId',
          ],
          formFilterValues,
        }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
              <Field label={t('trial:status')} error={errors.status?.message}>
                <SelectTrialStatus
                  placeholder={t('trial:status')}
                  trialStatus={status}
                  onChange={value => {
                    setValue('status', value);
                    trigger('status');
                  }}
                />
              </Field>
              <Field label={t('trial:course_roadmap')} error={errors.status?.message}>
                <SelectCourseRoadmap
                  placeholder={t('trial:course_roadmap')}
                  courseRoadmap={courseRoadmapId}
                  onChange={value => {
                    setValue('courseRoadmapId', value);
                    trigger('courseRoadmapId');
                  }}
                />
              </Field>
              <Field label={t('trial:class_type')} error={errors.classType?.message}>
                <SelectClassType
                  placeholder={t('trial:class_type')}
                  classType={classType}
                  onChange={value => {
                    setValue('classType', value);
                    trigger('classType');
                  }}
                />
              </Field>
              <Field label={t('trial:learning_type')} error={errors.learningType?.message}>
                <SelectLearningType
                  placeholder={t('trial:learning_type')}
                  learningType={learningType}
                  onChange={value => {
                    setValue('learningType', value);
                    trigger('learningType');
                  }}
                />
              </Field>
              <Field label={t('trial:office_learning')} error={errors.departmentId?.message}>
                <SelectDepartment
                  placeholder={t('trial:office_learning')}
                  department={departmentId}
                  onChange={value => {
                    setValue('departmentId', value);
                    trigger('departmentId');
                  }}
                />
              </Field>
              <Field label={t('trial:consultantor')} error={errors.consultantorId?.message}>
                <SelectEmployee
                  roles={[Role.Consultant]}
                  placeholder={t('trial:consultantor')}
                  employee={consultantorId}
                  onChange={value => {
                    setValue('consultantorId', value);
                    trigger('consultantorId');
                  }}
                />
              </Field>
              <Field label={t('trial:admin')} error={errors.adminId?.message}>
                <SelectEmployee
                  roles={[Role.Admin]}
                  placeholder={t('trial:admin')}
                  employee={adminId}
                  onChange={value => {
                    setValue('adminId', value);
                    trigger('adminId');
                  }}
                />
              </Field>
              <Field label={t('trial:lecture')} error={errors.lectureId?.message}>
                <SelectEmployee
                  roles={[Role.Lecturer]}
                  placeholder={t('trial:lecture')}
                  employee={lectureId}
                  onChange={value => {
                    setValue('lectureId', value);
                    trigger('lectureId');
                  }}
                />
              </Field>
            </div>
          </Form>
        ),
      }}
    />
  );
};
