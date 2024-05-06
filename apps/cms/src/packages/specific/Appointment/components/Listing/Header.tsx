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
  const { t } = useTranslation(['appointment']);

  return (
    <HeaderListing
      creatable={creatable}
      exportable={exportable}
      importable={importable}
      isExporting={isExporting}
      onCreate={onCreate}
      onExport={onExport}
      onImport={onImport}
      title={t('appointment:appointments')}
      createBtn={t('appointment:add_new')}
      exportBtn={t('appointment:export')}
      importBtn={t('appointment:import')}
    />
  );
};
