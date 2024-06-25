import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'reactjs';
import { Department } from '../../models/Department';
import { FormMutation, FormValues } from '../FormMutation/FormMutation';

interface Props {
  department: Department;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof FormValues, string>>;
  onSubmit?: (values: FormValues) => void;
  disabled?: boolean;
}

export const Edit = ({ department, ...formProps }: Props) => {
  const { t } = useTranslation(['department']);

  const [tabActive, setTabActive] = useState('general_information');

  return (
    <div>
      <Tabs
        onChange={setTabActive}
        tabActive={tabActive}
        tabs={[
          {
            key: 'general_information',
            label: t('department:general_information'),
            children: (
              <FormMutation
                {...formProps}
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
        ]}
      />
    </div>
  );
};
