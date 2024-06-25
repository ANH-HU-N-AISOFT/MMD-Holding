import dayjs from 'dayjs';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag } from 'reactjs';
import { BusinessStatusMappingToColors } from '../../constants/BusinessStatusMappingToColors';
import { importDepartments } from '../../services/importDepartments';
import { ResponseSuccess, validateImportDepartments } from '../../services/validateImportDepartments';
import { ModalPreview } from '~/components/Listing/ModalImport/ModalPreview';
import { ModalValidate, ModalValidateProps } from '~/components/Listing/ModalImport/ModalValidate';
import { BusinessStatusEnum } from '~/packages/common/SelectVariants/BusinessStatus/constants/BusinessStatusEnum';
import { getBusinessStatusMappingToLabels } from '~/packages/common/SelectVariants/BusinessStatus/constants/BusinessStatusMappingToLabels';
import { getPublicEnv } from '~/utils/enviroment/getPublicEnv';

interface Props {
  revalidate: () => void;
}

export interface ImportActions {
  open: () => void;
}

export const Import = forwardRef<ImportActions, Props>(({ revalidate }, ref) => {
  const { t } = useTranslation(['enum', 'department']);

  const BusinessStatusMappingToLabels = useMemo(() => {
    return getBusinessStatusMappingToLabels(t);
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
        importType={t('department:departments')}
        open={openModalValidateState}
        onCancel={() => setOpenModalValidateState(false)}
        downSampleUrl={`${getPublicEnv('VITE_RESTFUL_API')}/organizations/import/download-template`}
        validateService={validateImportDepartments}
        onValidateSuccess={handleValidate}
      />
      <ModalPreview
        onUploadNew={() => {
          setOpenModalPreviewState(false);
          setOpenModalValidateState(true);
        }}
        onImportSuccess={handleImport}
        importService={async validRecords => {
          await importDepartments({ data: validRecords });
          setOpenModalPreviewState(false);
        }}
        onCancel={() => setOpenModalPreviewState(false)}
        validateResponse={openModalPreviewState || undefined}
        importType={t('department:departments')}
        open={!!openModalPreviewState}
        columns={[
          {
            width: 200,
            title: t('department:name'),
            render: (_, record) => {
              return [record.name, record.code].filter(Boolean).join(' - ');
            },
          },
          {
            width: 240,
            title: t('department:manage_department_code'),
            render: (_, record) => {
              return record.managementUnitCode;
            },
          },
          {
            width: 180,
            align: 'center',
            title: t('department:business_status').toString(),
            render: (_, record) => {
              return (
                <Tag color={BusinessStatusMappingToColors[record.businessStatus as BusinessStatusEnum]}>
                  {BusinessStatusMappingToLabels[record.businessStatus as BusinessStatusEnum]}
                </Tag>
              );
            },
          },
          {
            width: 240,
            title: t('department:present_department_code'),
            render: (_, record) => {
              return record.unitManagerCode;
            },
          },
          {
            width: 180,
            title: t('department:address'),
            render: (_, record) => {
              return record.address;
            },
          },
          {
            width: 160,
            title: t('department:phone'),
            render: (_, record) => {
              return record.phoneNumber;
            },
          },
          {
            width: 160,
            title: t('department:email'),
            render: (_, record) => {
              return record.email;
            },
          },
          {
            width: 160,
            title: t('department:foundation_date'),
            align: 'center',
            render: (_, record) => {
              return record.foundationDate ? dayjs(record.foundationDate).format('DD/MM/YYYY') : null;
            },
          },
        ]}
      />
    </>
  );
});

Import.displayName = 'Import';
