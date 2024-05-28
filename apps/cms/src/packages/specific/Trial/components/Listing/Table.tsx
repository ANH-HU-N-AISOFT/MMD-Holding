import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Dropdown, Tag, Typography } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { TrialStatusMappingToColors } from '../../constants/TrialStatusMappingToColors';
import { Trial } from '../../models/Trial';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';
import { TableActions } from '~/components/TableActions/TableActions';
import { TooltipDetailInformation } from '~/components/TooltipDetailInformation/TooltipDetailInformation';
import { TrialStatus } from '~/packages/common/SelectVariants/TrialStatus/constants/TrialStatus';
import { getTrialStatusMappingToLabels } from '~/packages/common/SelectVariants/TrialStatus/constants/TrialStatusMappingToLabels';

export interface Props
  extends Pick<
    TableListingProps<Trial>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading'
  > {
  editable?: boolean;
  deletable?: boolean;
  onEdit?: (record: Trial) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: Trial) => void;
  onUpdateStatus?: (params: { record: Trial; status: TrialStatus }) => void;
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
  onUpdateStatus,
  deletable,
  editable,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'trial', 'employee']);

  const TrialStatusMappingToLabels = useMemo(() => {
    return getTrialStatusMappingToLabels(t);
  }, [t]);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<Trial>[] = [
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
      title: t('trial:student_name'),
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
      width: 200,
      title: t('trial:status'),
      render: (_, record) => {
        return (
          <div className="flex items-center justify-between gap-2">
            <Tag color={TrialStatusMappingToColors[record.status]}>{TrialStatusMappingToLabels[record.status]}</Tag>{' '}
            <Dropdown
              menu={{
                items: Object.values(TrialStatus).reduce<ItemType[]>((result, item) => {
                  if (item === record.status) {
                    return result;
                  }
                  return result.concat({
                    key: item,
                    onClick: () => onUpdateStatus?.({ record: record, status: item }),
                    label: <Tag color={TrialStatusMappingToColors[item]}>{TrialStatusMappingToLabels[item]}</Tag>,
                  });
                }, []),
              }}
            >
              <EditOutlined className="text-status-blue cursor-pointer" />
            </Dropdown>
          </div>
        );
      },
    },
    {
      width: 160,
      title: t('trial:class_trial'),
    },
    {
      width: 160,
      title: t('trial:office_learning'),
    },
    {
      width: 240,
      title: t('trial:consultantor_short'),
      render: (_, record) => {
        if (!record.consultant) {
          return null;
        }
        return (
          <div>
            <TooltipDetailInformation
              title={[record.consultant?.fullName].filter(Boolean).join(' - ')}
              extra={[
                [t('employee:phone'), record.consultant?.phoneNumber].join(': '),
                [t('employee:work_email'), record.consultant?.workEmail].join(': '),
              ]}
            />
          </div>
        );
      },
    },
    {
      width: 240,
      title: t('trial:admin'),
      render: (_, record) => {
        if (!record.admin) {
          return null;
        }
        return (
          <div>
            <TooltipDetailInformation
              title={[record.admin?.fullName].filter(Boolean).join(' - ')}
              extra={[
                [t('employee:phone'), record.admin?.phoneNumber].join(': '),
                [t('employee:work_email'), record.admin?.workEmail].join(': '),
              ]}
            />
          </div>
        );
      },
    },
    {
      width: 240,
      title: t('trial:lecture'),
      render: (_, record) => {
        if (!record.lecture) {
          return null;
        }
        return (
          <div>
            <TooltipDetailInformation
              title={[record.lecture?.fullName].filter(Boolean).join(' - ')}
              extra={[
                [t('employee:phone'), record.lecture?.phoneNumber].join(': '),
                [t('employee:work_email'), record.lecture?.workEmail].join(': '),
              ]}
            />
          </div>
        );
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('trial:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('trial:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('trial:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '3',
                label: t('trial:delete'),
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
      <TableListing<Trial>
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
            textToHighlight={t('trial:total_records_selected', {
              total: selectedRows.length,
            })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button danger onClick={() => onDeleteMany?.(selectedRows)}>
            {t('trial:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
