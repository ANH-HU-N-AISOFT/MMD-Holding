import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SelectSingle } from '~/components/AntCustom/Select';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/@remix';
import { useRemixForm } from '~/overrides/@remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/@base/utils/getCountForFilterDrawer';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { SelectDemoType } from '~/packages/common/SelectVariants/DemoType/SelectDemoType';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectCourseRoadmap } from '~/packages/common/SelectVariants/SelectCourseRoadmap';
import { SelectDepartment } from '~/packages/common/SelectVariants/SelectDepartment';
import { SelectStudyMode } from '~/packages/common/SelectVariants/StudyMode/SelectStudyMode';
import { SelectTrialRequestStatus } from '~/packages/common/SelectVariants/TrialRequestStatus/SelectTrialRequestStatus';

export interface FormFilterValues
  extends Pick<
    ListingSearchParams,
    | 'status'
    | 'classType'
    | 'courseRoadmapId'
    | 'departmentId'
    | 'learningType'
    | 'isAdminOwner'
    | 'isConsultantOwner'
    | 'isLecturerOwner'
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
  const isAdminOwner = watch('isAdminOwner') ?? false;
  const isConsultantOwner = watch('isConsultantOwner') ?? false;
  const isLecturerOwner = watch('isLecturerOwner') ?? false;

  const handleResetFormFilterValues = () => {
    reset({ status: undefined });
    onResetFilter?.();
  };

  useDeepCompareEffect(() => {
    reset(formFilterValues);
  }, [formFilterValues]);

  const session = getSession();
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
            'classType',
            'courseRoadmapId',
            'departmentId',
            'learningType',
            'isAdminOwner',
            'isConsultantOwner',
            'isLecturerOwner',
          ],
          formFilterValues,
        }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
              <Field label={t('trial:status')} error={errors.status?.message}>
                <SelectTrialRequestStatus
                  placeholder={t('trial:status')}
                  trialRequestStatus={status}
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
                <SelectDemoType
                  placeholder={t('trial:class_type')}
                  demoType={classType}
                  onChange={value => {
                    setValue('classType', value);
                    trigger('classType');
                  }}
                />
              </Field>
              <Field label={t('trial:learning_type')} error={errors.learningType?.message}>
                <SelectStudyMode
                  placeholder={t('trial:learning_type')}
                  studyMode={learningType}
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
              <Field
                label={t('trial:owner_admin')}
                className={classNames(session?.profile?.roles.includes(Role.Admin) ? 'block' : 'hidden')}
              >
                <SelectSingle
                  options={[
                    { label: t('trial:all'), value: 0, rawData: undefined },
                    { label: t('trial:me'), value: 1, rawData: undefined },
                  ]}
                  value={Number(isAdminOwner)}
                  onChange={value => setValue('isAdminOwner', Boolean(value))}
                />
              </Field>
              <Field
                label={t('trial:owner_lecture')}
                className={classNames(session?.profile?.roles.includes(Role.Lecturer) ? 'block' : 'hidden')}
              >
                <SelectSingle
                  options={[
                    { label: t('trial:all'), value: 0, rawData: undefined },
                    { label: t('trial:me'), value: 1, rawData: undefined },
                  ]}
                  value={Number(isLecturerOwner)}
                  onChange={value => setValue('isLecturerOwner', Boolean(value))}
                />
              </Field>
              <Field
                label={t('trial:owner_consultantor')}
                className={classNames(session?.profile?.roles.includes(Role.Consultant) ? 'block' : 'hidden')}
              >
                <SelectSingle
                  options={[
                    { label: t('trial:all'), value: 0, rawData: undefined },
                    { label: t('trial:me'), value: 1, rawData: undefined },
                  ]}
                  value={Number(isConsultantOwner)}
                  onChange={value => setValue('isConsultantOwner', Boolean(value))}
                />
              </Field>
            </div>
          </Form>
        ),
      }}
    />
  );
};
