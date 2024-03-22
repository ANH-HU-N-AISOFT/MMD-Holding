import {
  HomeOutlined,
  ClusterOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
  ExperimentOutlined,
  FileDoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@remix-run/react';
import { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';

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
          key: '/unit-list',
          label: t('dashboard_layout:menu.unit_list'),
          onClick: () => navigate('/unit-list'),
        },
        {
          key: '/user-list',
          label: t('dashboard_layout:menu.user_list'),
          onClick: () => navigate('/user-list'),
        },
      ],
    },
    {
      key: '/appointment-booking',
      icon: <CalendarOutlined />,
      label: t('dashboard_layout:menu.appointment_booking'),
      onClick: () => navigate('/appointment-booking'),
    },
    {
      key: '/input-assessment-schedule',
      icon: <ScheduleOutlined />,
      label: t('dashboard_layout:menu.input_assessment_schedule'),
      onClick: () => navigate('/input-assessment-schedule'),
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
          key: '/course-management-individual',
          label: t('dashboard_layout:menu.course_management_individual'),
          onClick: () => navigate('/course-management-individual'),
        },
        {
          key: '/course-combo-management',
          label: t('dashboard_layout:menu.course_combo_management'),
          onClick: () => navigate('/course-combo-management'),
        },
        {
          key: '/promotion-program-management',
          label: t('dashboard_layout:menu.promotion_program_management'),
          onClick: () => navigate('/promotion-program-management'),
        },
        {
          key: '/course-registration-for-customer',
          label: t('dashboard_layout:menu.course_registration_for_customer'),
          onClick: () => navigate('/course-registration-for-customer'),
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
      key: '/customer-management',
      icon: <UserOutlined />,
      label: t('dashboard_layout:menu.customer_management'),
      onClick: () => navigate('/customer-management'),
    },
  ];

  return items;
};
