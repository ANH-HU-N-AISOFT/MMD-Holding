import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { PromotionType } from '../constants/PromotionType';
import { PromotionStatus } from '../models/PromotionStatus';
import { getPromotions } from '../services/getPromotions';

interface Props {
  pageSize?: number;
  defaultOrganization?: string;
}

export const useGetGiftsOfOrganization = ({ pageSize, defaultOrganization }: Props) => {
  const [organizationId, setOrganizationId] = useState<string | undefined>(defaultOrganization);
  const { loading, data, run } = useRequest(getPromotions, { manual: true });

  useEffect(() => {
    if (organizationId) {
      run({
        perPage: pageSize,
        sortByName: -1,
        status: PromotionStatus.Active,
        organizationId,
        promotionTypes: PromotionType.Gift,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId]);

  return {
    loading,
    data,
    setOrganizationId,
  };
};
