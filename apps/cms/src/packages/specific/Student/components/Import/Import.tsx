import { Input } from 'antd';
import dayjs from 'dayjs';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { importStudents } from '../../services/importStudents';
import { ResponseSuccess, validateImportStudents } from '../../services/validateImportStudents';
import { ModalPreview } from '~/components/Listing/ModalImport/ModalPreview';
import { ModalValidate, ModalValidateProps } from '~/components/Listing/ModalImport/ModalValidate';
import { GenderEnum } from '~/packages/common/SelectVariants/Gender/constants/GenderEnum';
import { getGenderEnumMappingToLabels } from '~/packages/common/SelectVariants/Gender/constants/GenderEnumMappingToLabels';
import { SourceEnum } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnum';
import { getSourceEnumMappingToLabels } from '~/packages/common/SelectVariants/SourceEnum/constants/SourceEnumMappingToLabels';
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
  const { t } = useTranslation(['enum', 'student']);

  const GenderEnumMappingToLabels = useMemo(() => {
    return getGenderEnumMappingToLabels(t);
  }, [t]);
  const SourceEnumMappingToLabels = useMemo(() => {
    return getSourceEnumMappingToLabels(t);
  }, [t]);
  const SystemAccessStatusMappingToLabels = useMemo(() => {
    return getSystemAccessStatusMappingToLabels(t);
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
        importType={t('student:students')}
        open={openModalValidateState}
        onCancel={() => setOpenModalValidateState(false)}
        downSampleUrl={`${getPublicEnv('VITE_RESTFUL_API')}/students/import/download-template`}
        validateService={validateImportStudents}
        onValidateSuccess={handleValidate}
      />
      <ModalPreview
        onImportSuccess={handleImport}
        importService={async validRecords => {
          await importStudents({ data: validRecords });
        }}
        onCancel={() => setOpenModalPreviewState(false)}
        validateResponse={openModalPreviewState || undefined}
        importType={t('student:students')}
        open={!!openModalPreviewState}
        columns={[
          {
            width: 200,
            title: t('student:name'),
            render: (_, record) => record.fullName,
          },
          {
            width: 160,
            title: t('student:phone'),
            render: (_, record) => record.phoneNumber,
          },
          {
            width: 150,
            title: t('student:current_address'),
            render: (_, record) => record.address,
          },
          {
            width: 120,
            title: t('student:date_of_birth'),
            render: (_, record) => {
              return record.birthday ? dayjs(record.birthday).format('DD/MM/YYYY') : null;
            },
          },
          {
            width: 90,
            title: t('student:gender'),
            render: (_, record) => GenderEnumMappingToLabels[record.gender as GenderEnum],
          },
          {
            width: 160,
            title: t('student:parent_phone'),
            render: (_, record) => record.phoneNumberOfParent,
          },
          {
            width: 160,
            align: 'center',
            title: t('student:notify_result_to_parent'),
            render: (_, record) => {
              const isNotify = !!Number(record.notifyResultsToParent);
              return isNotify ? t('student:enable_notify') : t('student:disable_notify');
            },
          },
          {
            width: 160,
            align: 'center',
            title: t('student:source'),
            render: (_, record) => {
              return SourceEnumMappingToLabels[record.source as SourceEnum];
            },
          },
          {
            width: 160,
            title: t('student:department'),
            render: (_, record) => {
              return (
                <ul className="list-disc pl-3">
                  {record.organizationCodes.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              );
            },
          },
          {
            width: 160,
            title: t('student:sale_employees'),
            render: (_, record) => {
              return (
                <ul className="list-disc pl-3">
                  {record.supporterCodes.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              );
            },
          },
          {
            width: 160,
            title: t('student:username'),
            render: (_, record) => record.username,
          },
          {
            width: 200,
            align: 'center',
            title: t('student:access_status'),
            render: (_, record) => SystemAccessStatusMappingToLabels[record.accessStatus as SystemAccessStatus],
          },
          {
            width: 160,
            title: t('student:password'),
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
