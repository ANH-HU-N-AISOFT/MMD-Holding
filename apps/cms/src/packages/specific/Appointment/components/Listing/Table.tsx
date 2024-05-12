import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Dropdown, Tag, Typography } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { Appointment } from '../../models/Appointment';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';
import { TableActions } from '~/components/TableActions/TableActions';
import { TooltipDetailInformation } from '~/components/TooltipDetailInformation/TooltipDetailInformation';
import { AppointmentStatus } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatus';
import { AppointmentStatusMappingToColors } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatusMappingToColors';
import { getAppointmentStatusMappingToLabels } from '~/packages/common/SelectVariants/AppointmentStatus/constants/AppointmentStatusMappingToLabels';
import { getIeltsTestEnumMappingToLabels } from '~/packages/common/SelectVariants/IeltsTestEnum/constants/IeltsTestEnumMappingToLabels';

export interface Props
  extends Pick<
    TableListingProps<Appointment>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading'
  > {
  onEdit?: (record: Appointment) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: Appointment) => void;
  onViewStudent?: (record: Appointment) => void;
  onViewAdmin?: (record: Appointment) => void;
  onViewConsultant?: (record: Appointment) => void;
  onViewTester?: (record: Appointment) => void;
  onViewExpectInspectationDepartment?: (record: Appointment) => void;
  onUpdateStatus?: (params: { record: Appointment; status: AppointmentStatus }) => void;
  editable?: boolean;
  deletable?: boolean;
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
  onViewStudent,
  onViewAdmin,
  onViewConsultant,
  onViewTester,
  onViewExpectInspectationDepartment,
  onView,
  onUpdateStatus,
  deletable,
  editable,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'appointment', 'employee']);

  const AppointmentStatusMappingToLabels = useMemo(() => {
    return getAppointmentStatusMappingToLabels(t);
  }, [t]);

  const IeltsTypeMappingToLabels = useMemo(() => {
    return getIeltsTestEnumMappingToLabels(t);
  }, [t]);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<Appointment>[] = [
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
      width: 210,
      title: t('appointment:student_name'),
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => onViewStudent?.(record)}>
            <Typography.Paragraph className="text-[inherit] !mb-1">{record.student?.fullName}</Typography.Paragraph>
            <Typography.Paragraph className="text-[inherit] !mb-0">{record.student?.phoneNumber}</Typography.Paragraph>
          </Typography.Link>
        );
      },
    },
    {
      width: 200,
      title: t('appointment:status'),
      align: 'center',
      render: (_, record) => {
        return (
          <div className="flex items-center justify-between gap-2">
            <Tag color={AppointmentStatusMappingToColors[record.status]}>
              {AppointmentStatusMappingToLabels[record.status]}
            </Tag>
            <Dropdown
              menu={{
                items: Object.values(AppointmentStatus).reduce<ItemType[]>((result, item) => {
                  if (item === record.status) {
                    return result;
                  }
                  return result.concat({
                    key: item,
                    onClick: () => onUpdateStatus?.({ record: record, status: item }),
                    label: (
                      <Tag color={AppointmentStatusMappingToColors[item]}>{AppointmentStatusMappingToLabels[item]}</Tag>
                    ),
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
      title: t('appointment:appointment_date'),
      render: (_, record) => {
        return (
          <>
            <Typography.Paragraph className="!mb-1">
              {dayjs(record.appointmentDate).format('DD/MM/YYYY')}
            </Typography.Paragraph>
            <Typography.Paragraph className="!mb-0">{record.appointmentTime}</Typography.Paragraph>
          </>
        );
      },
    },
    {
      width: 200,
      title: t('appointment:test_shift'),
      render: (_, record) => {
        return record.testingShift?.name;
      },
    },
    {
      width: 200,
      title: t('appointment:test'),
      render: (_, record) => {
        return IeltsTypeMappingToLabels[record.test];
      },
    },
    {
      width: 240,
      title: t('appointment:consultant_short'),
      render: (_, record) => {
        if (!record.consultant) {
          return null;
        }
        return (
          <Typography.Link onClick={() => onViewConsultant?.(record)}>
            <TooltipDetailInformation
              title={[record.consultant?.fullName].filter(Boolean).join(' - ')}
              extra={[
                [t('employee:phone'), record.consultant?.phoneNumber].join(': '),
                [t('employee:work_email'), record.consultant?.workEmail].join(': '),
              ]}
            />
          </Typography.Link>
        );
      },
    },
    {
      width: 240,
      title: t('appointment:admin'),
      render: (_, record) => {
        if (!record.admin) {
          return null;
        }
        return (
          <Typography.Link onClick={() => onViewAdmin?.(record)}>
            <TooltipDetailInformation
              title={[record.admin?.fullName].filter(Boolean).join(' - ')}
              extra={[
                [t('employee:phone'), record.admin?.phoneNumber].join(': '),
                [t('employee:work_email'), record.admin?.workEmail].join(': '),
              ]}
            />
          </Typography.Link>
        );
      },
    },
    {
      width: 240,
      title: t('appointment:tester'),
      render: (_, record) => {
        if (!record.tester) {
          return null;
        }
        return (
          <Typography.Link onClick={() => onViewTester?.(record)}>
            <TooltipDetailInformation
              title={[record.tester?.fullName].filter(Boolean).join(' - ')}
              extra={[
                [t('employee:phone'), record.tester?.phoneNumber].join(': '),
                [t('employee:work_email'), record.tester?.workEmail].join(': '),
              ]}
            />
          </Typography.Link>
        );
      },
    },
    {
      width: 280,
      title: t('appointment:expect_inspection_department_short'),
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => onViewExpectInspectationDepartment?.(record)}>
            {[record.organization?.name, record.organization?.code].filter(Boolean).join(' - ')}
          </Typography.Link>
        );
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('appointment:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('appointment:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('appointment:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '3',
                label: t('appointment:delete'),
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
      <TableListing<Appointment>
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
            textToHighlight={t('appointment:total_records_selected', {
              total: selectedRows.length,
            })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button danger onClick={() => onDeleteMany?.(selectedRows)}>
            {t('appointment:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
