import { DeleteOutlined, EditOutlined, ExperimentOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Tag, Typography } from 'antd';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { FormStatusMappingToColors } from '../../constants/PromotionComboStatusMappingToColors';
import { ConsultantForm } from '../../models/ConsultantForm';
import { Collapsed } from '~/components/Collapsed/Collapsed';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';
import { TableActions } from '~/components/TableActions/TableActions';
import { getFormStatusMappingToLabels } from '~/packages/common/SelectVariants/FormStatus/constants/FormStatusMappingToLabels';
import { currencyFormatter } from '~/utils/functions/currency/currencyFormatter';
export interface Props
  extends Pick<
    TableListingProps<ConsultantForm>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading'
  > {
  editable?: boolean;
  onEdit?: (record: ConsultantForm) => void;
  deletable?: boolean;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: ConsultantForm) => void;
  trialCreatable: boolean;
  onCreateTrial?: (record: ConsultantForm) => void;
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
  onCreateTrial,
  deletable,
  editable,
  trialCreatable,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'consultant_form']);

  const FormStatusMappingToLabels = useMemo(() => {
    return getFormStatusMappingToLabels(t);
  }, [t]);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<ConsultantForm>[] = [
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
      width: 185,
      title: t('consultant_form:student_name'),
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => onView?.(record)}>
            <Typography.Paragraph className="text-[inherit] !mb-1">{record.student?.fullName}</Typography.Paragraph>
            <Typography.Paragraph className="text-[inherit] !mb-0">{record.student?.phoneNumber}</Typography.Paragraph>
          </Typography.Link>
        );
      },
    },
    {
      width: 160,
      align: 'center',
      title: t('consultant_form:status'),
      render: (_, record) => {
        return <Tag color={FormStatusMappingToColors[record.status]}>{FormStatusMappingToLabels[record.status]}</Tag>;
      },
    },
    {
      width: 280,
      title: t('consultant_form:course_roadmap'),
      render: (_, record) => {
        if (record.courseCombo) {
          return (
            <ul className="grid grid-cols-1 gap-1 pl-3">
              <Collapsed
                className="-ml-3 pt-2"
                disabled={!record.courseCombo?.courseRoadmap || record.courseCombo?.courseRoadmap?.length <= 3}
                LessState={record.courseCombo.courseRoadmap?.slice(0, 3)?.map(item => {
                  return (
                    <li key={item.id}>
                      {item.name} ({item.code})
                    </li>
                  );
                })}
                MoreState={record.courseCombo.courseRoadmap?.map(item => {
                  return (
                    <li key={item.id}>
                      {item.name} ({item.code})
                    </li>
                  );
                })}
              />
            </ul>
          );
        }
        return record.courseRoadmap?.name;
      },
    },
    {
      width: 220,
      title: t('consultant_form:fee_origin_with_measure'),
      render: (_, record) => currencyFormatter(record.originPrice),
    },
    {
      width: 220,
      title: t('consultant_form:fee_after_apply_promotion_with_measure'),
      render: (_, record) => currencyFormatter(record.salePrice),
    },
    {
      width: 220,
      title: t('consultant_form:gift'),
      render: (_, record) => {
        return (
          <ul className="grid grid-cols-1 gap-1 pl-3">
            <Collapsed
              className="-ml-3 pt-2"
              disabled={!record.gifts || record.gifts?.length <= 3}
              LessState={record.gifts?.slice(0, 3)?.map(item => {
                return <li key={item.id}>{item.giftDiscount}</li>;
              })}
              MoreState={record.gifts?.map(item => {
                return <li key={item.id}>{item.giftDiscount}</li>;
              })}
            />
          </ul>
        );
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('consultant_form:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('consultant_form:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('consultant_form:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '4',
                label: t('consultant_form:create_trial'),
                icon: <ExperimentOutlined />,
                onClick: () => onCreateTrial?.(record),
                hidden: !trialCreatable,
              },
              {
                key: '3',
                label: t('consultant_form:delete'),
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
      <TableListing<ConsultantForm>
        {...props}
        dataSource={dataSource}
        columns={columns}
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={totalRecords}
        rowKey={record => record.id}
        tableLayout="fixed"
        paginationMode="sticky"
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
        <div className="min-w-[400px] flex items-center justify-between">
          <Highlighter
            textToHighlight={t('consultant_form:total_records_selected', {
              total: selectedRows.length,
            })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button danger onClick={() => onDeleteMany?.(selectedRows)}>
            {t('consultant_form:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
