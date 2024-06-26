import {
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { Button, Tag, Typography } from 'reactjs';
import { TableActions } from 'reactjs';
import { Contract } from '../../models/Contract';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';

export interface Props
  extends Pick<
    TableListingProps<Contract>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading' | 'paginationMode'
  > {
  editable?: boolean;
  deletable?: boolean;
  onEdit?: (record: Contract) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: Contract) => void;
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
  const { t } = useTranslation(['common', 'contract']);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<Contract>[] = [
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
      width: 180,
      title: t('contract:code'),
      render: (_, record) => {
        return <Typography.Link onClick={() => onView?.(record)}>{record.code}</Typography.Link>;
      },
    },
    {
      width: 240,
      title: t('contract:student'),
      render: (_, record) => {
        return (
          <div>
            <Typography.Paragraph className="!mb-1 text-[inherit]">{record.studentName}</Typography.Paragraph>
            <Typography.Paragraph className="!mb-0 text-[inherit]">{record.studentPhone}</Typography.Paragraph>
          </div>
        );
      },
    },
    {
      width: 240,
      title: t('contract:parent'),
      render: (_, record) => {
        return (
          <div>
            <Typography.Paragraph className="!mb-1 text-[inherit]">{record.parentName}</Typography.Paragraph>
            <Typography.Paragraph className="!mb-0 text-[inherit]">{record.parentPhone}</Typography.Paragraph>
          </div>
        );
      },
    },
    {
      width: 210,
      title: t('contract:organization'),
      render: (_, record) => {
        return record.organizationName;
      },
    },
    {
      width: 180,
      title: t('contract:created_at'),
      render: (_, record) => {
        return record.createdAt ? dayjs(record.createdAt).format('DD/MM/YYYY') : null;
      },
    },
    {
      width: 160,
      fixed: 'right',
      align: 'center',
      title: t('contract:status'),
      render: () => {
        return <Tag color="success">{t('contract:active')}</Tag>;
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('contract:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('contract:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('contract:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '6',
                label: t('contract:download'),
                icon: <DownloadOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '4',
                label: t('contract:extend'),
                icon: <SyncOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '5',
                label: t('contract:cancel'),
                icon: <CloseOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '3',
                label: t('contract:delete'),
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
      <TableListing<Contract>
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
            textToHighlight={t('contract:total_records_selected', {
              total: selectedRows.length,
            })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button color="error" ghost onClick={() => onDeleteMany?.(selectedRows)}>
            {t('contract:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
