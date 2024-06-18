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
import { Role } from '~/packages/common/SelectVariants/Role/constants/Role';
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
      children: [
        {
          key: '/department',
          label: t('dashboard_layout:menu.department_list'),
          onClick: () => navigate('/department'),
          className: isCanShow({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] }) ? '' : '!hidden',
        },
        {
          key: '/employee',
          label: t('dashboard_layout:menu.user_list'),
          onClick: () => navigate('/employee'),
          className: isCanShow({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] }) ? '' : '!hidden',
        },
      ],
    },
    {
      key: '/appointment',
      icon: <ScheduleOutlined />,
      label: t('dashboard_layout:menu.appointment'),
      onClick: () => navigate('/appointment'),
      className: isCanShow({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] }) ? '' : '!hidden',
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
      children: [
        {
          key: '/consultant-form',
          label: t('dashboard_layout:menu.consultant_form'),
          onClick: () => navigate('/consultant-form'),
          className: isCanShow({ accept: [Role.SuperAdmin, Role.Consultant, Role.Sale] }) ? '' : '!hidden',
        },
        {
          key: '/promotion',
          label: t('dashboard_layout:menu.promotion'),
          onClick: () => navigate('/promotion'),
          className: isCanShow({ accept: [Role.SuperAdmin], not: [Role.SuperAdmin] }) ? '' : '!hidden',
        },
        {
          key: '/course-combo',
          label: t('dashboard_layout:menu.course_combo'),
          onClick: () => navigate('/course-combo'),
          className: isCanShow({ accept: [Role.SuperAdmin], not: [Role.SuperAdmin] }) ? '' : '!hidden',
        },
        {
          key: '/course-roadmap',
          label: t('dashboard_layout:menu.course_roadmap'),
          onClick: () => navigate('/course-roadmap'),
          className: isCanShow({ accept: [Role.SuperAdmin], not: [Role.SuperAdmin] }) ? '' : '!hidden',
        },
        {
          key: '/course',
          label: t('dashboard_layout:menu.course'),
          onClick: () => navigate('/course'),
          className: isCanShow({ accept: [Role.SuperAdmin], not: [Role.SuperAdmin] }) ? '' : '!hidden',
        },
      ],
    },
    {
      key: '/trial-request',
      icon: <ExperimentOutlined />,
      label: t('dashboard_layout:menu.trial_request'),
      onClick: () => navigate('/trial-request'),
      className: isCanShow({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale, Role.Lecturer] })
        ? ''
        : '!hidden',
    },
    {
      key: '/contract_signing',
      icon: <FileDoneOutlined />,
      label: t('dashboard_layout:menu.contract_signing'),
      children: [
        {
          key: '/contract-template',
          label: t('dashboard_layout:menu.contract_template'),
          onClick: () => navigate('/contract-template'),
        },
        {
          key: '/contract',
          label: t('dashboard_layout:menu.contract_list'),
          onClick: () => navigate('/contract'),
        },
        {
          key: '/registration-form-template',
          label: t('dashboard_layout:menu.registration_form_template'),
          onClick: () => navigate('/registration-form-template'),
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
      className: isCanShow({ accept: [Role.SuperAdmin, Role.Admin, Role.Consultant, Role.Sale] }) ? '' : '!hidden',
    },
  ];

  return items;
};
