import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { Button, Tag, Typography } from 'reactjs';
import { TableActions } from 'reactjs';
import { RegistrationForm } from '../../models/RegistrationForm';
import { Collapsed } from '~/components/Collapsed/Collapsed';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';

export interface Props
  extends Pick<
    TableListingProps<RegistrationForm>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading' | 'paginationMode'
  > {
  editable?: boolean;
  deletable?: boolean;
  courseViewable?: boolean;
  onEdit?: (record: RegistrationForm) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: RegistrationForm) => void;
  onViewCourse?: (record: Required<RegistrationForm>['courses'][number]) => void;
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
  onViewCourse,
  deletable,
  editable,
  courseViewable,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'registration_form']);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<RegistrationForm>[] = [
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
      title: t('registration_form:code'),
      render: (_, record) => {
        return <Typography.Link onClick={() => onView?.(record)}>{record.code}</Typography.Link>;
      },
    },
    {
      width: 210,
      title: t('registration_form:student'),
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
      width: 300,
      title: t('registration_form:course'),
      render: (_, record) => {
        return (
          <ul className="grid grid-cols-1 gap-1 pl-3">
            <Collapsed
              className="-ml-3 pt-2"
              disabled={!record.courses || record.courses?.length <= 3}
              LessState={record.courses?.slice(0, 3)?.map(item => {
                if (!courseViewable) {
                  return <li key={item.id}>{item.name}</li>;
                }
                return (
                  <li key={item.id}>
                    <Typography.Link onClick={() => onViewCourse?.(item)}>{item.name}</Typography.Link>
                  </li>
                );
              })}
              MoreState={record.courses?.map(item => {
                if (!courseViewable) {
                  return <li key={item.id}>{item.name}</li>;
                }
                return (
                  <li key={item.id}>
                    <Typography.Link onClick={() => onViewCourse?.(item)}>{item.name}</Typography.Link>
                  </li>
                );
              })}
            />
          </ul>
        );
      },
    },
    {
      width: 210,
      title: t('registration_form:organization'),
      render: (_, record) => {
        return record.organization;
      },
    },
    {
      width: 180,
      title: t('registration_form:created_at'),
      render: (_, record) => {
        return record.createdAt ? dayjs(record.createdAt).format('DD/MM/YYYY') : null;
      },
    },
    {
      width: 160,
      fixed: 'right',
      align: 'center',
      title: t('registration_form:status'),
      render: () => {
        return <Tag color="success">{t('registration_form:active')}</Tag>;
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('registration_form:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('registration_form:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('registration_form:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '6',
                label: t('registration_form:download'),
                icon: <DownloadOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '3',
                label: t('registration_form:delete'),
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
      <TableListing<RegistrationForm>
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
            textToHighlight={t('registration_form:total_records_selected', {
              total: selectedRows.length,
            })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button color="error" ghost onClick={() => onDeleteMany?.(selectedRows)}>
            {t('registration_form:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
