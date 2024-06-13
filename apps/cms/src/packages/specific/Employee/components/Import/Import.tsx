import { Input, Tag } from 'antd';
import dayjs from 'dayjs';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmployeeStatusMappingToColors } from '../../constants/EmployeeStatusMappingToColors';
import { importEmployees } from '../../services/importEmployees';
import { ResponseSuccess, validateImportEmployees } from '../../services/validateImportEmployees';
import { ModalPreview } from '~/components/Listing/ModalImport/ModalPreview';
import { ModalValidate, ModalValidateProps } from '~/components/Listing/ModalImport/ModalValidate';
import { EmployeeStatus } from '~/packages/common/SelectVariants/EmployeeStatus/constants/EmployeeStatus';
import { getEmployeeStatusMappingToLabels } from '~/packages/common/SelectVariants/EmployeeStatus/constants/EmployeeStatusMappingToLabels';
import { EmploymentContractType } from '~/packages/common/SelectVariants/EmploymentContractType/constants/EmploymentContractType';
import { getEmploymentContractTypeMappingToLabels } from '~/packages/common/SelectVariants/EmploymentContractType/constants/EmploymentContractTypeMappingToLabels';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { getGenderEnumMappingToLabels } from '~/packages/common/SelectVariants/Gender/constants/GenderEnumMappingToLabels';
import { SystemAccessStatus } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatus';
import { getSystemAccessStatusMappingToLabels } from '~/packages/common/SelectVariants/SystemAccessStatus/constants/SystemAccessStatusMappingToLabels';
import { getPublicEnv } from '~/utils/enviroment/getPublicEnv';

interface Props {
  revalidate: () => void;
}

export interface ImportActions {
  open: () => void;
}

export const Import = forwardRef<ImportActions, Props>(({ revalidate }, ref) => {
  const { t } = useTranslation(['enum', 'employee']);

  const GenderEnumMappingToLabels = useMemo(() => {
    return getGenderEnumMappingToLabels(t);
  }, [t]);
  const SystemAccessStatusMappingToLabels = useMemo(() => {
    return getSystemAccessStatusMappingToLabels(t);
  }, [t]);
  const EmployeeStatusMappingToLabels = useMemo(() => {
    return getEmployeeStatusMappingToLabels(t);
  }, [t]);
  const EmploymentContractTypeMappingToLabels = useMemo(() => {
    return getEmploymentContractTypeMappingToLabels(t);
  }, [t]);

  const [openModalValidateState, setOpenModalValidateState] = useState(false);
  const [openModalPreviewState, setOpenModalPreviewState] = useState<ResponseSuccess | false>(false);

  const handleValidate: ModalValidateProps<ResponseSuccess>['onValidateSuccess'] = data => {
    setOpenModalValidateState(false);
    setOpenModalPreviewState(data);
  };

  const handleImport = () => {
    revalidate();
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => setOpenModalValidateState(true),
      };
    },
    [],
  );

  return (
    <>
      <ModalValidate
        importType={t('employee:employees')}
        open={openModalValidateState}
        onCancel={() => setOpenModalValidateState(false)}
        downSampleUrl={`${getPublicEnv('VITE_RESTFUL_API')}/employees/import/download-template`}
        validateService={validateImportEmployees}
        onValidateSuccess={handleValidate}
      />
      <ModalPreview
        onImportSuccess={handleImport}
        importService={async validRecords => {
          await importEmployees({ data: validRecords });
        }}
        onCancel={() => setOpenModalPreviewState(false)}
        validateResponse={openModalPreviewState || undefined}
        importType={t('employee:employees')}
        open={!!openModalPreviewState}
        columns={[
          {
            width: 200,
            title: t('employee:full_name'),
            render: (_, record) => record.fullName,
          },
          {
            width: 160,
            title: t('employee:phone'),
            render: (_, record) => record.phoneNumber,
          },
          {
            width: 120,
            title: t('employee:date_of_birth'),
            render: (_, record) => {
              return record.birthday ? dayjs(record.birthday).format('DD/MM/YYYY') : null;
            },
          },
          {
            width: 90,
            title: t('employee:gender'),
            render: (_, record) => {
              return GenderEnumMappingToLabels[record.gender as GenderEnum];
            },
          },
          {
            width: 160,
            title: t('employee:work_email'),
            render: (_, record) => {
              return record.workEmail;
            },
          },
          {
            width: 160,
            title: t('employee:personal_email'),
            render: (_, record) => {
              return record.personalEmail;
            },
          },
          {
            width: 150,
            title: t('employee:current_address'),
            render: (_, record) => {
              return record.currentAddress;
            },
          },
          {
            width: 180,
            title: t('employee:residence_address'),
            render: (_, record) => {
              return record.permanentAddress;
            },
          },
          {
            width: 160,
            title: t('employee:citizen_id_card'),
            render: (_, record) => {
              return record.cmnd;
            },
          },
          {
            width: 240,
            title: t('employee:emergency_contact_name'),
            render: (_, record) => {
              return record.emergencyContactName;
            },
          },
          {
            width: 160,
            title: t('employee:emergency_contact_phone'),
            render: (_, record) => {
              return record.emergencyContactPhone;
            },
          },
          {
            width: 200,
            title: t('employee:emergency_contact_relationship'),
            render: (_, record) => {
              return record.emergencyContactRelationship;
            },
          },
          {
            width: 160,
            title: t('employee:note'),
            render: (_, record) => {
              return record.notes;
            },
          },
          {
            width: 160,
            title: t('employee:department'),
            render: (_, record) => {
              return record.organizationCode;
            },
          },
          {
            width: 220,
            title: t('employee:work_status'),
            align: 'center',
            render: (_, record) => {
              return (
                <Tag color={EmployeeStatusMappingToColors[record.workStatus as EmployeeStatus]}>
                  {EmployeeStatusMappingToLabels[record.workStatus as EmployeeStatus]}
                </Tag>
              );
            },
          },
          {
            width: 160,
            title: t('employee:direction_manager'),
            render: (_, record) => {
              return record.directManagerCode;
            },
          },
          {
            width: 180,
            title: t('employee:employment_contract_type'),
            render: (_, record) => {
              return EmploymentContractTypeMappingToLabels[record.contractType as EmploymentContractType];
            },
          },
          {
            width: 220,
            title: t('employee:contract_start_effect_date'),
            render: (_, record) => {
              return record.contractStartDate ? dayjs(record.contractStartDate).format('DD/MM/YYYY') : null;
            },
          },
          {
            width: 220,
            title: t('employee:contract_end_effect_date'),
            render: (_, record) => {
              return record.contractEndDate ? dayjs(record.contractEndDate).format('DD/MM/YYYY') : null;
            },
          },
          {
            width: 160,
            title: t('employee:username'),
            render: (_, record) => record.username,
          },
          {
            width: 200,
            align: 'center',
            title: t('employee:employee_access_status'),
            render: (_, record) => SystemAccessStatusMappingToLabels[record.accessStatus as SystemAccessStatus],
          },
          {
            width: 160,
            title: t('employee:password'),
            render: (_, record) => (
              <Input.Password className="!px-0" readOnly value={record.password} variant="borderless" />
            ),
          },
        ]}
      />
    </>
  );
});

Import.displayName = 'Import';
