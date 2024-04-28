import { useTranslation } from 'react-i18next';
import { HeaderListing } from '~/components/Listing';

export const Header = () => {
  const { t } = useTranslation(['customer_management']);

  return (
    <HeaderListing
      title={t('customer_management:customers')}
      createBtn={t('customer_management:add_new')}
      exportBtn={t('customer_management:export')}
      importBtn={t('customer_management:import')}
    />
  );
};
