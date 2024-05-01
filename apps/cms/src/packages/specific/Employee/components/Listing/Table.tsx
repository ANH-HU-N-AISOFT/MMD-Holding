import { DeleteOutlined, EditOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { EmployeeStatusMappingToColors } from '../../constants/EmployeeStatusMappingToColors';
import { getEmployeeStatusMappingToLabels } from '../../constants/EmployeeStatusMappingToLabels';
import { getRoleMappingToLabels } from '../../constants/RoleMappingToLabels';
import { Employee } from '../../models/Employee';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';
import { TableActions } from '~/components/TableActions/TableActions';

export interface Props
  extends Pick<
    TableListingProps<Employee>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading'
  > {
  onEdit?: (record: Employee) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: Employee) => void;
  onResetPassword?: (record: Employee) => void;
  editable?: boolean;
  deletable?: boolean;
  passwordResetable?: boolean;
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
  onResetPassword,
  deletable,
  editable,
  passwordResetable,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'employee']);

  const RoleMappingToLabels = useMemo(() => {
    return getRoleMappingToLabels(t);
  }, [t]);
  const EmployeeStatusMappingToLabels = useMemo(() => {
    return getEmployeeStatusMappingToLabels(t);
  }, [t]);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<Employee>[] = [
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
      width: 160,
      title: t('employee:code_short'),
      render: (_, record) => record.employee?.code,
    },
    {
      width: 200,
      title: t('employee:name'),
      render: (_, record) => record.fullName,
    },
    {
      width: 220,
      align: 'center',
      title: t('employee:status'),
      render: (_, record) => {
        if (record.employee) {
          return (
            <Tag color={EmployeeStatusMappingToColors[record.employee.workStatus]}>
              {EmployeeStatusMappingToLabels[record.employee.workStatus]}
            </Tag>
          );
        }
        return null;
      },
    },
    {
      width: 280,
      title: t('employee:work_email'),
      render: (_, record) => record.workEmail,
    },
    {
      width: 160,
      title: t('employee:department_code_short'),
      render: (_, record) => record.organization?.fullName,
    },
    {
      width: 160,
      title: t('employee:role'),
      render: (_, record) => record.user?.roles.map(role => RoleMappingToLabels[role]).join(', '),
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('employee:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('employee:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('employee:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '4',
                label: t('employee:reset_password'),
                icon: <LockOutlined />,
                onClick: () => onResetPassword?.(record),
                hidden: !passwordResetable,
              },
              {
                key: '3',
                label: t('employee:delete'),
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => onDelete?.(record.employeeId),
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
      <TableListing<Employee>
        {...props}
        dataSource={dataSource}
        columns={columns}
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={totalRecords}
        rowKey={record => record.employeeId}
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
            textToHighlight={t('employee:total_records_selected', { total: selectedRows.length })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button danger onClick={() => onDeleteMany?.(selectedRows)}>
            {t('employee:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};