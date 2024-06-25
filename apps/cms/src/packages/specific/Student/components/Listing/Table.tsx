import {
  DeleteOutlined,
  EditOutlined,
  ExperimentOutlined,
  EyeOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from 'reactjs';
import { TableActions } from 'reactjs';
import { Student } from '../../models/Student';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';

export interface Props
  extends Pick<
    TableListingProps<Student>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading' | 'paginationMode'
  > {
  onEdit?: (record: Student) => void;
  editable?: boolean;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  deletable?: boolean;
  onResetPassword?: (record: Student) => void;
  passwordResetable?: boolean;
  onView?: (record: Student) => void;
  onViewDepartment?: (record: Required<Student>['organizations'][number]) => void;
  departmentViewable: boolean;
  onBookAppointment?: (record: Student) => void;
  appointmentBookable: boolean;
  onCreateConsultant?: (record: Student) => void;
  consultantCreatable: boolean;
  onCreateTrial?: (record: Student) => void;
  trialCreatable: boolean;
  hideColumnDepartment?: boolean;
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
  onViewDepartment,
  onBookAppointment,
  onCreateConsultant,
  onCreateTrial,
  deletable,
  editable,
  passwordResetable,
  appointmentBookable,
  consultantCreatable,
  departmentViewable,
  trialCreatable,
  hideColumnDepartment,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'student']);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<Student>[] = [
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
      width: 140,
      title: t('student:code'),
      render: (_, record) => {
        return <Typography.Link onClick={() => onView?.(record)}>{record.code}</Typography.Link>;
      },
    },
    {
      width: 200,
      title: t('student:name'),
      render: (_, record) => {
        return <Typography.Link onClick={() => onView?.(record)}>{record.fullName}</Typography.Link>;
      },
    },
    {
      width: 160,
      title: t('student:phone'),
      render: (_, record) => record.phoneNumber,
    },
    {
      width: 140,
      title: t('student:date_of_birth'),
      render: (_, record) => {
        return record.birthday ? dayjs(record.birthday).format('DD/MM/YYYY') : null;
      },
    },
    {
      width: 240,
      title: t('student:department_name'),
      hidden: hideColumnDepartment,
      render: (_, record) => {
        return (
          <ul className="grid grid-cols-1 pl-3">
            {record.organizations?.map(item => {
              if (!departmentViewable) {
                <li key={item.id}>{[item.name, item.code].join(' - ')}</li>;
              }
              return (
                <li key={item.id}>
                  <Typography.Link onClick={() => onViewDepartment?.(item)} className="block" key={item.id}>
                    {[item.name, item.code].join(' - ')}
                  </Typography.Link>
                </li>
              );
            })}
          </ul>
        );
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('student:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('student:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('student:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '5',
                label: t('student:book_appointment'),
                icon: <ScheduleOutlined />,
                onClick: () => onBookAppointment?.(record),
                hidden: !appointmentBookable,
              },
              {
                key: '6',
                label: t('student:create_consultant'),
                icon: <QuestionCircleOutlined />,
                onClick: () => onCreateConsultant?.(record),
                hidden: !consultantCreatable,
              },
              {
                key: '7',
                label: t('student:create_trial'),
                icon: <ExperimentOutlined />,
                onClick: () => onCreateTrial?.(record),
                hidden: !trialCreatable,
              },
              {
                key: '4',
                label: t('student:reset_password'),
                icon: <LockOutlined />,
                onClick: () => onResetPassword?.(record),
                hidden: !passwordResetable,
              },
              {
                key: '3',
                label: t('student:delete'),
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
      <TableListing<Student>
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
            textToHighlight={t('student:total_records_selected', { total: selectedRows.length })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button color="error" ghost onClick={() => onDeleteMany?.(selectedRows)}>
            {t('student:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
