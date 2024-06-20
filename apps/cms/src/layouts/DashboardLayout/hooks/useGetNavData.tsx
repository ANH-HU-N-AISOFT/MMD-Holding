import {
  CheckCircleOutlined,
  ClusterOutlined,
  ExperimentOutlined,
  FileDoneOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  ScheduleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '~/overrides/@remix';
import { ActionType, ResourceType } from '~/packages/common/SelectVariants/Permission/Permission';
import { isCanShow } from '~/utils/functions/isCan/isCanShow';

export const useGetNavData = () => {
  const { t } = useTranslation(['dashboard_layout']);
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <HomeOutlined />,
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
      ],
    },
    {
      key: '/appointment',
      icon: <ScheduleOutlined />,
      label: t('dashboard_layout:menu.appointment'),
      onClick: () => navigate('/appointment'),
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
      icon: <QuestionCircleOutlined />,
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
      onClick: () => navigate('/trial-request'),
      className: isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.TRIAL_REQUEST }) ? '' : '!hidden',
    },
    {
      key: '/contract_signing',
      icon: <FileDoneOutlined />,
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
    {
      key: '/student',
      icon: <UserOutlined />,
      label: t('dashboard_layout:menu.student'),
      onClick: () => navigate('/student'),
      className: isCanShow({ actionType: ActionType.READ, resourceType: ResourceType.STUDENT }) ? '' : '!hidden',
    },
  ];

  return items;
};
