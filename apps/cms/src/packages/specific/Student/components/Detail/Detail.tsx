import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'reactjs';
import { Student } from '../../models/Student';
import { FormMutation, TabKey as FormMutationTabKey } from '../FormMutation/FormMutation';
import { AppointmentsOfStudent } from './components/AppointmentsOfStudent';
import { ConsultantFormsOfStudent } from './components/ConsultantFormsOfStudent';
import { TrialRequestsOfStudent } from './components/TrialRequestsOfStudent';

interface Props {
  student: Student;
}

type TabKey = FormMutationTabKey | 'appointment' | 'consultant_form' | 'trial_request';
export const Detail = ({ student }: Props) => {
  const { t } = useTranslation(['student']);

  const [tabActive, setTabActive] = useState<TabKey>('personalInformation');

  return (
    <div>
      <Tabs
        onChange={value => setTabActive(value as TabKey)}
        tabActive={tabActive}
        tabs={[
          {
            key: 'personalInformation',
            label: t('student:personal_information'),
            children: (
              <FormMutation
                hideTabs
                student={student}
                tabActive={tabActive as FormMutationTabKey}
                setTabActive={setTabActive as Dispatch<SetStateAction<FormMutationTabKey>>}
                isSubmiting={false}
                uid=""
                disabled
                defaultValues={{
                  personalInformation: {
                    city: student.province?.id,
                    currentAddress: student.address,
                    dateOfBirth: student.birthday,
                    departments: student.organizationIds,
                    district: student.district?.id,
                    email: student.email,
                    fullName: student.fullName,
                    gender: student.gender,
                    notifyResultToParent: student.notifyParentsOfResults,
                    parentPhone: student.parentPhoneNumber,
                    phone: student.phoneNumber,
                    saleEmployees: student.supporterIds ?? [],
                    school: student.school?.id,
                    source: student.source,
                  },
                  roleSystem: {
                    accessStatus: student.user?.accessStatus,
                    username: student.user?.userName,
                  },
                }}
              />
            ),
          },
          {
            key: 'roleSystem',
            label: t('student:role_system'),
            children: (
              <FormMutation
                hideTabs
                student={student}
                tabActive={tabActive as FormMutationTabKey}
                setTabActive={setTabActive as Dispatch<SetStateAction<FormMutationTabKey>>}
                isSubmiting={false}
                uid=""
                disabled
                defaultValues={{
                  personalInformation: {
                    city: student.province?.id,
                    currentAddress: student.address,
                    dateOfBirth: student.birthday,
                    departments: student.organizationIds,
                    district: student.district?.id,
                    email: student.email,
                    fullName: student.fullName,
                    gender: student.gender,
                    notifyResultToParent: student.notifyParentsOfResults,
                    parentPhone: student.parentPhoneNumber,
                    phone: student.phoneNumber,
                    saleEmployees: student.supporterIds ?? [],
                    school: student.school?.id,
                    source: student.source,
                  },
                  roleSystem: {
                    accessStatus: student.user?.accessStatus,
                    username: student.user?.userName,
                  },
                }}
              />
            ),
          },
          {
            key: 'appointment',
            label: t('student:appointment'),
            children: <AppointmentsOfStudent student={student} />,
          },
          {
            key: 'consultant_form',
            label: t('student:consultant_form'),
            children: <ConsultantFormsOfStudent student={student} />,
          },
          {
            key: 'trial_request',
            label: t('student:trial_request'),
            children: <TrialRequestsOfStudent student={student} />,
          },
        ]}
      />
    </div>
  );
};
