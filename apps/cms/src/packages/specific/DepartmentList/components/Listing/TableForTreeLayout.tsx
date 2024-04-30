import { CaretRightOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { ExpandableConfig } from 'antd/es/table/interface';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { BusinessStatusMappingToColors } from '../../constants/BusinessStatusMappingToColors';
import { getBusinessStatusMappingToLabels } from '../../constants/BusinessStatusMappingToLabels';
import { Department } from '../../models/Department';
import './styles.css';
import { TreeNodeData, leavesToTreeDataNode } from './utils/leavesToTreeDataNode';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';
import { TableActions } from '~/components/TableActions/TableActions';

export interface Props extends Pick<TableListingProps<Department>, 'dataSource' | 'loading'> {
  onEdit?: (record: Department) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: Department) => void;
}

export const TableForTreeLayout = ({ dataSource = [], onEdit, onDelete, onDeleteMany, onView, ...props }: Props) => {
  const { t } = useTranslation(['common', 'department']);
  const [rowsExpanding, setRowsExpanding] = useState<string[]>([]);
  const businessStatusMappingToLabels = useMemo(() => {
    return getBusinessStatusMappingToLabels(t);
  }, [t]);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  const columns: ListingColumnType<TreeNodeData>[] = [
    {
      width: 200,
      title: t('department:name'),
      render: (_, record) => {
        const isExpanding = rowsExpanding.includes(record.generalInformation.id);
        const hasChild = !isEmpty(record.children);
        return (
          <div className="flex items-center gap-2 first_column">
            <CaretRightOutlined
              className={classNames(
                'text-base cursor-pointer transition-all will-change-transform',
                hasChild ? '' : 'invisible pointer-events-none',
                isExpanding ? 'rotate-90' : 'rotate-0',
              )}
              onClick={() => {
                setRowsExpanding(state => {
                  if (isExpanding) {
                    return state.filter(item => item !== record.generalInformation.id);
                  }
                  return state.concat(record.generalInformation.id);
                });
              }}
            />
            <div>{[record.generalInformation.name, record.generalInformation.code].join(' - ')}</div>
          </div>
        );
      },
    },
    {
      width: 140,
      align: 'center',
      title: t('department:status').toString(),
      render: (_, record) => {
        return (
          <Tag color={BusinessStatusMappingToColors[record.generalInformation.businessStatus]}>
            {businessStatusMappingToLabels[record.generalInformation.businessStatus]}
          </Tag>
        );
      },
    },
    {
      width: 200,
      title: t('department:present_department'),
      render: (_, record) => record.generalInformation.unitManager?.fullName,
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
                onClick: () => onEdit?.(record.generalInformation),
              },
              {
                key: '2',
                label: t('department:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record.generalInformation),
              },
              {
                key: '3',
                label: t('department:delete'),
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => onDelete?.(record.generalInformation.id),
              },
            ]}
          />
        );
      },
    },
  ];

  const expandedRowRender: ExpandableConfig<TreeNodeData>['expandedRowRender'] = () => {
    return null;
  };

  const tree = leavesToTreeDataNode(dataSource as Department[]);
  return (
    <>
      <TableListing<TreeNodeData>
        {...props}
        className="DepartmentListing__Table"
        expandable={{
          expandedRowRender,
          rowExpandable: record => !isEmpty(record.children),
          columnWidth: 0,
          expandedRowKeys: rowsExpanding,
        }}
        dataSource={tree}
        columns={columns}
        rowKey={record => record.generalInformation.id}
        tableLayout="fixed"
        paginationMode="sticky"
        nonePagination
        currentPage={1}
        pageSize={1000}
        plural={() => ''}
        singular={() => ''}
        totalRecords={1000}
      />
      <SickyAction isVisible={!!selectedRows.length}>
        <div className="min-w-[400px] flex items-center justify-between">
          <Highlighter
            textToHighlight={t('department:total_records_selected', { total: selectedRows.length })}
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
