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
  const { t } = useTranslation(['document_template']);

  return (
    <HeaderListing
      creatable={creatable}
      exportable={exportable}
      importable={importable}
      isExporting={isExporting}
      onCreate={onCreate}
      onExport={onExport}
      onImport={onImport}
      title={t('document_template:document_templates')}
      createBtn={t('document_template:add_new')}
      exportBtn={t('document_template:export')}
      importBtn={t('document_template:import')}
    />
  );
};
