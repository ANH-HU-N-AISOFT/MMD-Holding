import { Tabs } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Department } from '../../models/Department';
import { FormMutation } from '../FormMutation/FormMutation';

interface Props {
  department: Department;
}

export const Detail = ({ department }: Props) => {
  const { t } = useTranslation(['department']);

  const [tabActive, setTabActive] = useState('general_information');

  return (
    <div>
      <Tabs
        onChange={setTabActive}
        activeKey={tabActive}
        items={[
          {
            key: 'general_information',
            label: t('department:general_information'),
            children: (
              <FormMutation
                isSubmiting={false}
                uid=""
                disabled
                defaultValues={{
                  address: department.address,
                  businessStatus: department.businessStatus,
                  city: department.province,
                  code: department.code,
                  email: department.email,
                  foundationDate: department.foundationDate,
                  manageDepartmentId: department.managementUnit?.id,
                  name: department.name,
                  phone: department.phoneNumber,
                  presentDepartmentId: department.unitManager?.id,
                }}
              />
            ),
          },
          {
            key: 'subordinate_department',
            label: t('department:subordinate_department'),
            children: <h1 className="text-2xl">Tính năng đang phát triển</h1>,
          },
          {
            key: 'staff',
            label: t('department:staff'),
            children: <h1 className="text-2xl">Tính năng đang phát triển</h1>,
          },
          {
            key: 'student',
            label: t('department:student'),
            children: <h1 className="text-2xl">Tính năng đang phát triển</h1>,
          },
        ]}
      />
    </div>
  );
};