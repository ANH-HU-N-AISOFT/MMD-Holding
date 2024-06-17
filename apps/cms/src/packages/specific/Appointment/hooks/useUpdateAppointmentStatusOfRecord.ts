import { notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateAppointmentStatus } from '../services/updateAppointmentStatus';
import { handleCatchClauseSimpleAtClient } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

export const useUpdateAppointmentStatusOfRecord = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(['appointment']);

  const handleUpdate = async ({
    id,
    status,
    revalidate,
  }: Parameters<typeof updateAppointmentStatus>['0'] & { revalidate: () => void }) => {
    setIsLoading(true);
    try {
      await updateAppointmentStatus({ id, status });
      notification.success({
        message: t('appointment:update_success'),
      });
      revalidate();
    } catch (error) {
      const message = handleGetMessageToToast(t, await handleCatchClauseSimpleAtClient(error));
      notification.error({
        message: t('appointment:update_failure'),
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    update: handleUpdate,
  };
};
