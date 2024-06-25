import { CheckCircleOutlined, ClusterOutlined, ExperimentOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
  AntRawMenuProps,
  IconCalendarEditLinear,
  IconHeartEditLinear,
  IconHomeLinear,
  IconReceiptLinear,
} from 'reactjs';
import { useNavigate } from '~/overrides/@remix';
import { isCanShow } from '~/packages/specific/Permission/isCan/isCanShow';
import { ActionType, ResourceType } from '~/packages/specific/Permission/Permission';
import { getDefaultListingAppointmentsUrl } from '~/routes/Appointment/constants/getDefaultFilterUrl';
import { getDefaultListingTrialRequestsUrl } from '~/routes/TrialRequest/constants/getDefaultFilterUrl';

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
      className:
        isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.ORGANIZATION }) ||
        isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.EMPLOYEE })
          ? ''
          : '!hidden',
      children: [
        {
          key: '/department',
          label: t('dashboard_layout:menu.department_list'),
          onClick: () => navigate('/department'),
          className: isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.ORGANIZATION })
            ? ''
            : '!hidden',
        },
        {
          key: '/employee',
          label: t('dashboard_layout:menu.employee'),
          onClick: () => navigate('/employee'),
          className: isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.EMPLOYEE }) ? '' : '!hidden',
        },
        {
          key: '/student',
          // icon: <UserOutlined />,
          label: t('dashboard_layout:menu.student'),
          onClick: () => navigate('/student'),
          className: isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.STUDENT }) ? '' : '!hidden',
        },
      ],
    },
    {
      key: '/appointment',
      icon: <IconCalendarEditLinear className="!text-lg" />,
      label: t('dashboard_layout:menu.appointment'),
      onClick: () => navigate(getDefaultListingAppointmentsUrl()),
      className: isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.APPOINTMENT }) ? '' : '!hidden',
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
        isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.CONSULTATION }) ||
        isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.PROMOTION }) ||
        isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.COURSE_COMBO }) ||
        isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.COURSE_ROADMAP }) ||
        isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.COURSE })
          ? ''
          : '!hidden',
      children: [
        {
          key: '/consultant-form',
          label: t('dashboard_layout:menu.consultant_form'),
          onClick: () => navigate('/consultant-form'),
          className: isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.CONSULTATION })
            ? ''
            : '!hidden',
        },
        {
          key: '/promotion',
          label: t('dashboard_layout:menu.promotion'),
          onClick: () => navigate('/promotion'),
          className: isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.PROMOTION }) ? '' : '!hidden',
        },
        {
          key: '/course-combo',
          label: t('dashboard_layout:menu.course_combo'),
          onClick: () => navigate('/course-combo'),
          className: isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.COURSE_COMBO })
            ? ''
            : '!hidden',
        },
        {
          key: '/course-roadmap',
          label: t('dashboard_layout:menu.course_roadmap'),
          onClick: () => navigate('/course-roadmap'),
          className: isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.COURSE_ROADMAP })
            ? ''
            : '!hidden',
        },
        {
          key: '/course',
          label: t('dashboard_layout:menu.course'),
          onClick: () => navigate('/course'),
          className: isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.COURSE }) ? '' : '!hidden',
        },
      ],
    },
    {
      key: '/trial-request',
      icon: <ExperimentOutlined />,
      label: t('dashboard_layout:menu.trial_request'),
      onClick: () => navigate(getDefaultListingTrialRequestsUrl()),
      className: isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.TRIAL_REQUEST }) ? '' : '!hidden',
    },
    {
      key: '/contract_signing',
      icon: <IconReceiptLinear className="!text-lg" />,
      label: t('dashboard_layout:menu.contract_signing'),
      // FIXME: Permission
      children: [
        {
          key: '/document-template',
          label: t('dashboard_layout:menu.document_template'),
          onClick: () => navigate('/document-template'),
        },
        {
          key: '/contract',
          label: t('dashboard_layout:menu.contract_list'),
          onClick: () => navigate('/contract'),
        },
        {
          key: '/registration-form',
          label: t('dashboard_layout:menu.registration_form_list'),
          onClick: () => navigate('/registration-form'),
        },
      ],
    },
  ];

  return items;
};
