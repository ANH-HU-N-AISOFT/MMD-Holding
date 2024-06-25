import { TrialRequest } from '../models/TrialRequest';
import { TrialRequestStatus } from '../models/TrialRequestStatus';
import { fetchApi } from '~/utils/functions/fetchApi';

interface UpdateTrialRequestStatus {
  status: TrialRequestStatus;
  id: TrialRequest['id'];
}

export const updateTrialRequestStatus = async ({ id, status }: UpdateTrialRequestStatus) => {
  const response = await fetchApi.request({
    url: `/trial-requests/status/${id}`,
    method: 'PUT',
    data: { status },
  });
  return response.data;
};
