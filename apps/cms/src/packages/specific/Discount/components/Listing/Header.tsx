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
  const { t } = useTranslation(['discount']);

  return (
    <HeaderListing
      importable={importable}
      exportable={exportable}
      creatable={creatable}
      isExporting={isExporting}
      onCreate={onCreate}
      onExport={onExport}
      onImport={onImport}
      title={t('discount:discounts')}
      createBtn={t('discount:add_new')}
      exportBtn={t('discount:export')}
      importBtn={t('discount:import')}
    />
  );
};
