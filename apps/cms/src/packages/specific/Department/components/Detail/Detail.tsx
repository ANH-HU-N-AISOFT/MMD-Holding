import { Tabs } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Department } from '../../models/Department';
import { FormMutation } from '../FormMutation/FormMutation';
import { EmployeesOfDepartment } from './components/EmployeesOfDepartment';
import { StudentsOfDepartment } from './components/StudentsOfDepartment';
import { SubDepartmentsOfDepartment } from './components/SubDepartmentsOfDepartment';

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
                department={department}
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
            children: <SubDepartmentsOfDepartment department={department} />,
          },
          {
            key: 'employee',
            label: t('department:employee'),
            children: <EmployeesOfDepartment department={department} />,
          },
          {
            key: 'student',
            label: t('department:student'),
            children: <StudentsOfDepartment department={department} />,
          },
        ]}
      />
    </div>
  );
};
