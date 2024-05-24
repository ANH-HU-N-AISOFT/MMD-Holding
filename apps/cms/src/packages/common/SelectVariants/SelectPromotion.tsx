import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { PromotionStatus } from './PromotionStatus/constants/PromotionStatus';
import {
  SelectSingleDecoupling,
  SelectSingleDecouplingProps,
} from '~/components/SelectDecoupling/SelectSingleDecoupling';
import { GetAllParams } from '~/constants/GetAllParams';
import { Promotion } from '~/packages/specific/Promotion/models/Promotion';
import { getPromotions } from '~/packages/specific/Promotion/services/getPromotions';

interface Props {
  promotion?: Promotion['id'];
  onChange?: SelectSingleDecouplingProps<Promotion, Promotion['id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  className?: string;
}

export const SelectPromotion = ({
  disabled,
  promotion,
  allowClear = true,
  placeholder,
  onChange,
  className,
}: Props) => {
  const { t } = useTranslation(['promotion']);

  return (
    <SelectSingleDecoupling<Promotion, Promotion['id']>
      allowClear={allowClear}
      placeholder={placeholder ?? t('promotion:promotion')}
      disabled={disabled}
      value={promotion}
      onChange={onChange}
      service={async () => {
        const response = await getPromotions({
          ...GetAllParams,
          sortByName: 1,
          status: PromotionStatus.Active,
        });
        return response.items;
      }}
      transformToOption={promotion => {
        return {
          label: promotion['name'],
          searchValue: promotion['name'],
          value: promotion['id'],
          rawData: promotion,
        };
      }}
      className={classNames('w-full', className)}
    />
  );
};
