import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Tag, Typography } from 'antd';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { getBusinessStatusMappingToLabels } from '../../../../common/SelectVariants/BusinessStatus/constants/BusinessStatusMappingToLabels';
import { BusinessStatusMappingToColors } from '../../constants/BusinessStatusMappingToColors';
import { Department } from '../../models/Department';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';
import { TableActions } from '~/components/TableActions/TableActions';

export interface Props
  extends Pick<
    TableListingProps<Department>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading'
  > {
  editable?: boolean;
  deletable?: boolean;
  onEdit?: (record: Department) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: Department) => void;
  onViewManageDepartment?: (record: Department) => void;
  onViewPresentDepartment?: (record: Department) => void;
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
  onViewManageDepartment,
  onViewPresentDepartment,
  deletable,
  editable,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'department']);
  const businessStatusMappingToLabels = useMemo(() => {
    return getBusinessStatusMappingToLabels(t);
  }, [t]);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<Department>[] = [
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
      width: 48,
      align: 'center',
      title: '#',
      render: (_, __, index) => pageSize * (currentPage - 1) + index + 1,
    },
    {
      width: 200,
      title: t('department:name'),
      render: (_, record) => [record.name, record.code].filter(Boolean).join(' - '),
    },
    {
      width: 200,
      title: t('department:manage_department'),
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => onViewManageDepartment?.(record)}>
            {[record.managementUnit?.fullName, record.managementUnit?.code].filter(Boolean).join(' - ')}
          </Typography.Link>
        );
      },
    },
    {
      width: 180,
      align: 'center',
      title: t('department:status').toString(),
      render: (_, record) => {
        return (
          <Tag color={BusinessStatusMappingToColors[record.businessStatus]}>
            {businessStatusMappingToLabels[record.businessStatus]}
          </Tag>
        );
      },
    },
    {
      width: 200,
      title: t('department:present_department'),
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => onViewPresentDepartment?.(record)}>
            {[record.unitManager?.fullName, record.unitManager?.code].filter(Boolean).join(' - ')}
          </Typography.Link>
        );
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('department:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('department:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('department:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '3',
                label: t('department:delete'),
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
      <TableListing<Department>
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
            textToHighlight={t('department:total_records_selected', {
              total: selectedRows.length,
            })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button danger onClick={() => onDeleteMany?.(selectedRows)}>
            {t('department:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
