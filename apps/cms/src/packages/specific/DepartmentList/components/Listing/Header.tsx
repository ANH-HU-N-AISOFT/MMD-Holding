import { useTranslation } from 'react-i18next';
import { HeaderListing } from '~/components/Listing';

interface Props {
  onExport: () => void;
  onImport: () => void;
  onCreate: () => void;
  isExporting: boolean;
}

export const Header = ({ onCreate, onExport, onImport, isExporting }: Props) => {
  const { t } = useTranslation(['department']);

  return (
    <HeaderListing
      isExporting={isExporting}
      onCreate={onCreate}
      onExport={onExport}
      onImport={onImport}
      title={t('department:departments')}
      createBtn={t('department:add_new')}
      exportBtn={t('department:export')}
      importBtn={t('department:import')}
    />
  );
};
