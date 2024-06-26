import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Field, useDeepCompareEffect } from 'reactjs';
import { SelectSingle } from 'reactjs';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/lisitngUrlSearchParamsUtils';
import { SelectStudyMode } from '../SelectVariants/SelectStudyMode';
import { SelectTrialRequestStatus } from '../SelectVariants/SelectTrialRequestStatus';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { getCountForFilterDrawer } from '~/packages/base/utils/getCountForFilterDrawer';
import { getSession } from '~/packages/common/Auth/sessionStorage';
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
import { SelectCourseRoadmap } from '~/packages/specific/CourseRoadmap/components/SelectVariants/SelectCourseRoadmap';
import { SelectDepartment } from '~/packages/specific/Department/components/SelectVariants/SelectDepartment';
import { SelectDemoType } from '~/packages/specific/TrialRequest/components/SelectVariants/SelectDemoType';

export interface FormFilterValues
  extends Pick<
    ListingSearchParams,
    | 'status'
    | 'demoType'
    | 'courseRoadmapId'
    | 'departmentId'
    | 'studyMode'
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
  const { t } = useTranslation(['common', 'trial_request']);

  const disabledField = !!isSubmiting;

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
  const demoType = watch('demoType');
  const studyMode = watch('studyMode');
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
        placeholder: t('trial_request:search_placeholder'),
        searchValue: searchValue,
        onSearch: onSearch,
      }}
      filter={{
        uid: UID,
        onReset: handleResetFormFilterValues,
        count: getCountForFilterDrawer({
          fieldKeys: [
            'status',
            'demoType',
            'courseRoadmapId',
            'departmentId',
            'studyMode',
            'isAdminOwner',
            'isConsultantOwner',
            'isLecturerOwner',
          ],
          formFilterValues,
        }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
              <Field label={t('trial_request:status')} error={errors.status?.message}>
                <SelectTrialRequestStatus
                  disabled={disabledField}
                  placeholder={t('trial_request:status')}
                  trialRequestStatus={status}
                  onChange={value => {
                    setValue('status', value);
                    trigger('status');
                  }}
                />
              </Field>
              <Field label={t('trial_request:course_roadmap')} error={errors.courseRoadmapId?.message}>
                <SelectCourseRoadmap
                  disabled={disabledField}
                  placeholder={t('trial_request:course_roadmap')}
                  courseRoadmap={courseRoadmapId}
                  onChange={value => {
                    setValue('courseRoadmapId', value);
                    trigger('courseRoadmapId');
                  }}
                />
              </Field>
              <Field label={t('trial_request:demo_type')} error={errors.demoType?.message}>
                <SelectDemoType
                  disabled={disabledField}
                  placeholder={t('trial_request:demo_type')}
                  demoType={demoType}
                  onChange={value => {
                    setValue('demoType', value);
                    trigger('demoType');
                  }}
                />
              </Field>
              <Field label={t('trial_request:study_mode')} error={errors.studyMode?.message}>
                <SelectStudyMode
                  disabled={disabledField}
                  placeholder={t('trial_request:study_mode')}
                  studyMode={studyMode}
                  onChange={value => {
                    setValue('studyMode', value);
                    trigger('studyMode');
                  }}
                />
              </Field>
              <Field label={t('trial_request:office_learning')} error={errors.departmentId?.message}>
                <SelectDepartment
                  disabled={disabledField}
                  scope="currentUser"
                  extraDepartments={[]}
                  placeholder={t('trial_request:office_learning')}
                  department={departmentId}
                  onChange={value => {
                    setValue('departmentId', value);
                    trigger('departmentId');
                  }}
                />
              </Field>
              <Field
                label={t('trial_request:owner_admin')}
                className={classNames(session?.profile?.roles.includes(Role.Admin) ? 'block' : 'hidden')}
              >
                <SelectSingle
                  options={[
                    { label: t('trial_request:all'), value: 0, rawData: undefined },
                    { label: t('trial_request:me'), value: 1, rawData: undefined },
                  ]}
                  value={Number(isAdminOwner)}
                  onChange={value => setValue('isAdminOwner', Boolean(value))}
                />
              </Field>
              <Field
                label={t('trial_request:owner_lecture')}
                className={classNames(session?.profile?.roles.includes(Role.Lecturer) ? 'block' : 'hidden')}
              >
                <SelectSingle
                  options={[
                    { label: t('trial_request:all'), value: 0, rawData: undefined },
                    { label: t('trial_request:me'), value: 1, rawData: undefined },
                  ]}
                  value={Number(isLecturerOwner)}
                  onChange={value => setValue('isLecturerOwner', Boolean(value))}
                />
              </Field>
              <Field
                label={t('trial_request:owner_consultantor')}
                className={classNames(session?.profile?.roles.includes(Role.Consultant) ? 'block' : 'hidden')}
              >
                <SelectSingle
                  options={[
                    { label: t('trial_request:all'), value: 0, rawData: undefined },
                    { label: t('trial_request:me'), value: 1, rawData: undefined },
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
