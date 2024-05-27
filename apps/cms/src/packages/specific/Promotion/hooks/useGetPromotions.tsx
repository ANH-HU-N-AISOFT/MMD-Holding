import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { getPromotions } from '../services/getPromotions';
import { PromotionStatus } from '~/packages/common/SelectVariants/PromotionStatus/constants/PromotionStatus';
import { PromotionType } from '~/packages/common/SelectVariants/PromotionType/constants/PromotionType';

interface Props {
  variants: 'discount' | 'gift';
  pageSize?: number;
}

export const useGetPromtions = ({ variants, pageSize }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { loading, data, run } = useRequest(getPromotions, { manual: true });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handleChangePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    run({
      query: search,
      perPage: pageSize,
      page,
      sortByName: -1,
      status: PromotionStatus.Active,
      promotionTypes:
        variants === 'gift'
          ? PromotionType.Gift
          : [PromotionType.FeeDiscount, PromotionType.PercentageDiscount].join(','),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, variants]);

  return {
    loading,
    data,
    page,
    changePage: handleChangePage,
    search,
    changeSearch: handleSearch,
  };
};
