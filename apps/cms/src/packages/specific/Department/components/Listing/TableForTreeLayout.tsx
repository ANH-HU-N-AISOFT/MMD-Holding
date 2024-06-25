import { CaretRightOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { ExpandableConfig } from 'antd/es/table/interface';
import classNames from 'classnames';
import { isEmpty, nth } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { Button, Tag, Typography } from 'reactjs';
import { TableActions } from 'reactjs';
import { getBusinessStatusMappingToLabels } from '../../../../common/SelectVariants/BusinessStatus/constants/BusinessStatusMappingToLabels';
import { BusinessStatusMappingToColors } from '../../constants/BusinessStatusMappingToColors';
import { Department } from '../../models/Department';
import './styles.css';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { TreeNodeData, leavesToTreeDataNode } from './utils/leavesToTreeDataNode';
import { shakeUnmatchedBranches } from './utils/shakeUnmatchedBranches';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';

export interface Props extends Pick<TableListingProps<Department>, 'dataSource' | 'loading'> {
  editable?: boolean;
  deletable?: boolean;
  onEdit?: (record: Department) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: Department) => void;
  onViewPresentDepartment?: (record: Department) => void;
  searchParams?: ListingSearchParams;
}

export const TableForTreeLayout = ({
  dataSource = [],
  onEdit,
  onDelete,
  onDeleteMany,
  onView,
  onViewPresentDepartment,
  deletable,
  editable,
  searchParams = {},
  ...props
}: Props) => {
  const { t } = useTranslation(['enum', 'department', 'common']);
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
          <div className="first_column flex items-center gap-2">
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
            <Typography.Link onClick={() => onView?.(record.generalInformation)}>
              {[record.generalInformation.name, record.generalInformation.code].join(' - ')}
            </Typography.Link>
          </div>
        );
      },
    },
    {
      width: 180,
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
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => onViewPresentDepartment?.(record.generalInformation)}>
            {[record.generalInformation.unitManager?.fullName, record.generalInformation.unitManager?.code]
              .filter(Boolean)
              .join(' - ')}
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
                onClick: () => onEdit?.(record.generalInformation),
                hidden: !editable,
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
                hidden: !deletable,
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

  const { tree, nodeMatchedIds } = useMemo(() => {
    const result = leavesToTreeDataNode(dataSource as Department[], searchParams);
    const { nodeMatchedIds } = shakeUnmatchedBranches(result);

    return {
      tree: result,
      nodeMatchedIds,
    };
  }, [dataSource, searchParams]);

  useEffect(() => {
    // Default mở nút root ra
    const rootId = nth(0, tree)?.generalInformation.id;
    if (rootId) {
      setRowsExpanding([rootId]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const rootId = nth(0, tree)?.generalInformation.id;
    if (rootId) {
      setRowsExpanding([rootId, ...nodeMatchedIds]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeMatchedIds]);

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
        <div className="flex min-w-[400px] items-center justify-between">
          <Highlighter
            textToHighlight={t('department:total_records_selected', { total: selectedRows.length })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button color="error" ghost onClick={() => onDeleteMany?.(selectedRows)}>
            {t('department:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
