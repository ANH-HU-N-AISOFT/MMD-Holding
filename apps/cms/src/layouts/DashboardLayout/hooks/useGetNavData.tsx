import { CheckCircleOutlined, ClusterOutlined, ExperimentOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
  AntRawMenuProps,
  IconCalendarEditLinear,
  IconHeartEditLinear,
  IconHomeLinear,
  IconReceiptLinear,
} from 'reactjs';
import { useNavigate } from '~/overrides/remix';
import { isCanShow } from '~/packages/specific/Permission/isCan/isCanShow';
import { getDefaultListingAppointmentsUrl } from '~/routes/Appointment/constants/getDefaultFilterUrl';
import { isCanReadAppointment } from '~/routes/Appointment/src/utils/Is';
import { isCanReadConsultantForm } from '~/routes/ConsultantForm/src/utils/Is';
import { isCanReadContract } from '~/routes/Contract/src/utils/Is';
import { isCanReadCourse } from '~/routes/Course/src/utils/Is';
import { isCanReadCourseCombo } from '~/routes/CourseCombo/src/utils/Is';
import { isCanReadCourseRoadmap } from '~/routes/CourseRoadmap/src/utils/Is';
import { isCanReadDepartment } from '~/routes/Department/src/utils/Is';
import { isCanReadDocumentTemplate } from '~/routes/DocumentTemplate/src/utils/Is';
import { isCanReadEmployee } from '~/routes/Employee/src/utils/Is';
import { isCanReadPromotion } from '~/routes/Promotion/src/utils/Is';
import { isCanReadRegistrationForm } from '~/routes/RegistrationForm/src/utils/Is';
import { isCanReadStudent } from '~/routes/Student/src/utils/Is';
import { getDefaultListingTrialRequestsUrl } from '~/routes/TrialRequest/constants/getDefaultFilterUrl';
import { isCanReadTrialRequest } from '~/routes/TrialRequest/src/utils/Is';

export const useGetNavData = () => {
  const { t } = useTranslation(['dashboard_layout']);
  const navigate = useNavigate();

  const items: AntRawMenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <IconHomeLinear className="!text-lg" />,
      label: t('dashboard_layout:menu.home'),
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/organizational-structure',
      icon: <ClusterOutlined />,
      label: t('dashboard_layout:menu.organizational_structure'),
      className: isCanShow(isCanReadDepartment) || isCanShow(isCanReadEmployee) ? '' : '!hidden',
      children: [
        {
          key: '/department',
          label: t('dashboard_layout:menu.department_list'),
          onClick: () => navigate('/department'),
          className: isCanShow(isCanReadDepartment) ? '' : '!hidden',
        },
        {
          key: '/employee',
          label: t('dashboard_layout:menu.employee'),
          onClick: () => navigate('/employee'),
          className: isCanShow(isCanReadEmployee) ? '' : '!hidden',
        },
        {
          key: '/student',
          // icon: <UserOutlined />,
          label: t('dashboard_layout:menu.student'),
          onClick: () => navigate('/student'),
          className: isCanShow(isCanReadStudent) ? '' : '!hidden',
        },
      ],
    },
    {
      key: '/appointment',
      icon: <IconCalendarEditLinear className="!text-lg" />,
      label: t('dashboard_layout:menu.appointment'),
      onClick: () => navigate(getDefaultListingAppointmentsUrl()),
      className: isCanShow(isCanReadAppointment) ? '' : '!hidden',
    },
    {
      key: '/input-check',
      icon: <CheckCircleOutlined />,
      label: t('dashboard_layout:menu.input_check'),
      onClick: () => navigate('/input-check'),
    },
    {
      key: '/consultation',
      icon: <IconHeartEditLinear className="!text-lg" />,
      label: t('dashboard_layout:menu.consultation'),
      className:
        isCanShow(isCanReadConsultantForm) ||
        isCanShow(isCanReadPromotion) ||
        isCanShow(isCanReadCourseCombo) ||
        isCanShow(isCanReadCourseRoadmap) ||
        isCanShow(isCanReadCourse)
          ? ''
          : '!hidden',
      children: [
        {
          key: '/consultant-form',
          label: t('dashboard_layout:menu.consultant_form'),
          onClick: () => navigate('/consultant-form'),
          className: isCanShow(isCanReadConsultantForm) ? '' : '!hidden',
        },
        {
          key: '/promotion',
          label: t('dashboard_layout:menu.promotion'),
          onClick: () => navigate('/promotion'),
          className: isCanShow(isCanReadPromotion) ? '' : '!hidden',
        },
        {
          key: '/course-combo',
          label: t('dashboard_layout:menu.course_combo'),
          onClick: () => navigate('/course-combo'),
          className: isCanShow(isCanReadCourseCombo) ? '' : '!hidden',
        },
        {
          key: '/course-roadmap',
          label: t('dashboard_layout:menu.course_roadmap'),
          onClick: () => navigate('/course-roadmap'),
          className: isCanShow(isCanReadCourseRoadmap) ? '' : '!hidden',
        },
        {
          key: '/course',
          label: t('dashboard_layout:menu.course'),
          onClick: () => navigate('/course'),
          className: isCanShow(isCanReadCourse) ? '' : '!hidden',
        },
      ],
    },
    {
      key: '/trial-request',
      icon: <ExperimentOutlined />,
      label: t('dashboard_layout:menu.trial_request'),
      onClick: () => navigate(getDefaultListingTrialRequestsUrl()),
      className: isCanShow(isCanReadTrialRequest) ? '' : '!hidden',
    },
    {
      key: '/contract_signing',
      icon: <IconReceiptLinear className="!text-lg" />,
      label: t('dashboard_layout:menu.contract_signing'),
      className:
        isCanShow(isCanReadDocumentTemplate) || isCanShow(isCanReadContract) || isCanShow(isCanReadRegistrationForm)
          ? ''
          : '!hidden',
      children: [
        {
          key: '/document-template',
          label: t('dashboard_layout:menu.document_template'),
          onClick: () => navigate('/document-template'),
          className: isCanShow(isCanReadDocumentTemplate) ? '' : '!hidden',
        },
        {
          key: '/contract',
          label: t('dashboard_layout:menu.contract_list'),
          onClick: () => navigate('/contract'),
          className: isCanShow(isCanReadContract) ? '' : '!hidden',
        },
        {
          key: '/registration-form',
          label: t('dashboard_layout:menu.registration_form_list'),
          onClick: () => navigate('/registration-form'),
          className: isCanShow(isCanReadRegistrationForm) ? '' : '!hidden',
        },
      ],
    },
  ];

  return items;
};
