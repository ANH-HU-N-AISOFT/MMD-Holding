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
        },
        {
          key: '/employee',
          label: t('dashboard_layout:menu.user_list'),
          onClick: () => navigate('/employee'),
        },
      ],
    },
    // {
    //   key: '/appointment-booking',
    //   icon: <CalendarOutlined />,
    //   label: t('dashboard_layout:menu.appointment_booking'),
    //   onClick: () => navigate('/appointment-booking'),
    // },
    {
      key: '/appointment',
      icon: <ScheduleOutlined />,
      label: t('dashboard_layout:menu.appointment'),
      onClick: () => navigate('/appointment'),
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
        },
        {
          key: '/trial',
          label: t('dashboard_layout:menu.trial'),
          onClick: () => navigate('/trial'),
        },
        {
          key: '/promotion',
          label: t('dashboard_layout:menu.promotion'),
          onClick: () => navigate('/promotion'),
        },
        {
          key: '/course-combo',
          label: t('dashboard_layout:menu.course_combo'),
          onClick: () => navigate('/course-combo'),
        },
        {
          key: '/course-roadmap',
          label: t('dashboard_layout:menu.course_roadmap'),
          onClick: () => navigate('/course-roadmap'),
        },
        {
          key: '/course',
          label: t('dashboard_layout:menu.course'),
          onClick: () => navigate('/course'),
        },
      ],
    },
    {
      key: '/test-study',
      icon: <ExperimentOutlined />,
      label: t('dashboard_layout:menu.test_study'),
      onClick: () => navigate('/test-study'),
    },
    {
      key: '/contract_signing',
      icon: <FileDoneOutlined />,
      label: t('dashboard_layout:menu.contract_signing'),
      children: [
        {
          key: '/contract-template-management',
          label: t('dashboard_layout:menu.contract_template_management'),
          onClick: () => navigate('/contract-template-management'),
        },
        {
          key: '/contract-management',
          label: t('dashboard_layout:menu.contract_management'),
          onClick: () => navigate('/contract-management'),
        },
      ],
    },
    {
      key: '/student',
      icon: <UserOutlined />,
      label: t('dashboard_layout:menu.student'),
      onClick: () => navigate('/student'),
    },
  ];

  return items;
};
