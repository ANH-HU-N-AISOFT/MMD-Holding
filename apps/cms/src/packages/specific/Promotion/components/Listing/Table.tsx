import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { Button, Tag, Typography } from 'reactjs';
import { TableActions } from 'reactjs';
import { PromotionStatusMappingToColors } from '../../constants/PromotionComboStatusMappingToColors';
import { Promotion } from '../../models/Promotion';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';
import { getPromotionStatusMappingToLabels } from '~/packages/common/SelectVariants/PromotionStatus/constants/PromotionStatusMappingToLabels';
import { PromotionType } from '~/packages/common/SelectVariants/PromotionType/constants/PromotionType';
import { getPromotionTypeMappingToLabels } from '~/packages/common/SelectVariants/PromotionType/constants/PromotionTypeMappingToLabels';
import { currencyFormatter } from '~/utils/functions/currency/currencyFormatter';
export interface Props
  extends Pick<
    TableListingProps<Promotion>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading' | 'paginationMode'
  > {
  editable?: boolean;
  deletable?: boolean;
  onEdit?: (record: Promotion) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: Promotion) => void;
}

export const Table = ({
  currentPage,
  pageSize,
  totalRecords,
  dataSource = [],
  onChange,
  onEdit,
  onDelete,
  onDeleteMany,
  onView,
  deletable,
  editable,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'promotion']);

  const PromotionStatusMappingToLabels = useMemo(() => {
    return getPromotionStatusMappingToLabels(t);
  }, [t]);

  const PromotionTypeMappingToLabels = useMemo(() => {
    return getPromotionTypeMappingToLabels(t);
  }, [t]);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<Promotion>[] = [
    // {
    //   width: 70,
    //   title: (
    //     <div className="flex items-center gap-3">
    //       <Checkbox
    //         checked={isCheckedAll}
    //         onChange={event => {
    //           const checked = event.target.checked;
    //           setSelectedRows(() => {
    //             if (checked) {
    //               return dataSource.map(item => item.id);
    //             }
    //             return [];
    //           });
    //         }}
    //       />
    //       #
    //     </div>
    //   ),
    //   render: (_, _record, index) => {
    //     return (
    //       <div className="flex items-center gap-3">
    //         <Checkbox
    //           checked={selectedRows.includes(record.id)}
    //           onChange={event => {
    //             const checked = event.target.checked;
    //             setSelectedRows(state => {
    //               if (checked) {
    //                 return state.concat(record.id);
    //               }
    //               return state.filter(item => item !== record.id);
    //             });
    //           }}
    //         />
    //         {index + 1}
    //       </div>
    //     );
    //   },
    // },
    {
      width: 54,
      align: 'center',
      title: '#',
      render: (_, __, index) => pageSize * (currentPage - 1) + index + 1,
    },
    {
      width: 245,
      title: t('promotion:name'),
      render: (_, record) => {
        return <Typography.Link onClick={() => onView?.(record)}>{record.name}</Typography.Link>;
      },
    },
    {
      width: 109,
      align: 'center',
      title: t('promotion:status'),
      render: (_, record) => (
        <Tag color={PromotionStatusMappingToColors[record.status]}>{PromotionStatusMappingToLabels[record.status]}</Tag>
      ),
    },
    {
      width: 190,
      title: t('promotion:type'),
      render: (_, record) => PromotionTypeMappingToLabels[record.programType],
    },
    {
      width: 220,
      title: t('promotion:promotion2'),
      render: (_, record) => {
        if (record.programType === PromotionType.FeeDiscount) {
          return currencyFormatter(record.feeDiscount, true);
        }
        if (record.programType === PromotionType.PercentageDiscount) {
          return record.percentageDiscount + '%';
        }
        if (record.programType === PromotionType.Gift) {
          return record.giftDiscount;
        }
        return null;
      },
    },
    {
      width: 220,
      title: t('promotion:date_available'),
      render: (_, record) => {
        return record.startDate && record.endDate
          ? [dayjs(record.startDate).format('DD/MM/YYYY'), dayjs(record.endDate).format('DD/MM/YYYY')].join(' - ')
          : null;
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('promotion:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('promotion:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('promotion:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '3',
                label: t('promotion:delete'),
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => onDelete?.(record.id),
                hidden: !deletable,
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <>
      <TableListing<Promotion>
        {...props}
        dataSource={dataSource}
        columns={columns}
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={totalRecords}
        rowKey={record => record.id}
        tableLayout="fixed"
        plural={({ from, to }) => {
          return t('common:showing_range_results', {
            from,
            to,
            total: totalRecords,
          });
        }}
        onChange={onChange}
        singular={({ from, to }) => {
          return t('common:showing_range_result', {
            from,
            to,
            total: totalRecords,
          });
        }}
      />
      <SickyAction isVisible={!!selectedRows.length}>
        <div className="flex min-w-[400px] items-center justify-between">
          <Highlighter
            textToHighlight={t('promotion:total_records_selected', {
              total: selectedRows.length,
            })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button color="error" ghost onClick={() => onDeleteMany?.(selectedRows)}>
            {t('promotion:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
