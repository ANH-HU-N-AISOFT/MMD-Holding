import { useTranslation } from 'react-i18next';
import { HeaderListing } from '~/components/Listing';

interface Props {
  onExport: () => void;
  onImport: () => void;
  onCreate: () => void;
  isExporting: boolean;
  creatable?: boolean;
  exportable?: boolean;
  importable?: boolean;
}

export const Header = ({ onCreate, onExport, onImport, isExporting, creatable, exportable, importable }: Props) => {
  const { t } = useTranslation(['student']);

  return (
    <HeaderListing
      creatable={creatable}
      exportable={exportable}
      importable={importable}
      isExporting={isExporting}
      onCreate={onCreate}
      onExport={onExport}
      onImport={onImport}
      title={t('student:students')}
      createBtn={t('student:add_new')}
      exportBtn={t('student:export')}
      importBtn={t('student:import')}
    />
  );
};
