import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Tag, Typography } from 'antd';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { CourseStatusMappingToColors } from '../../constants/CourseStatusMappingToColors';
import { Course } from '../../models/Course';
import { Collapsed } from '~/components/Collapsed/Collapsed';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';
import { TableActions } from '~/components/TableActions/TableActions';
import { getCourseStatusMappingToLabels } from '~/packages/common/SelectVariants/CourseStatus/constants/CourseStatusMappingToLabels';

export interface Props
  extends Pick<
    TableListingProps<Course>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading'
  > {
  editable?: boolean;
  deletable?: boolean;
  onEdit?: (record: Course) => void;
  onViewRoadMap?: (record: Required<Course>['courseRoadmaps'][number]) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: Course) => void;
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
  onViewRoadMap,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'course']);

  const CourseStatusMappingToLabels = useMemo(() => {
    return getCourseStatusMappingToLabels(t);
  }, [t]);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<Course>[] = [
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
      width: 537,
      title: t('course:name'),
      render: (_, record) => {
        return <Typography.Link onClick={() => onView?.(record)}>{record.name}</Typography.Link>;
      },
    },
    {
      width: 300,
      title: t('course:course_roadmap'),
      render: (_, record) => {
        return (
          <ul className="grid grid-cols-1 gap-1 pl-3">
            <Collapsed
              className="-ml-3 pt-2"
              disabled={!record.courseRoadmaps || record.courseRoadmaps?.length <= 3}
              LessState={record.courseRoadmaps?.slice(0, 3)?.map(item => {
                return (
                  <li key={item.id}>
                    <Typography.Link onClick={() => onViewRoadMap?.(item)}>
                      {item.name} ({item.code})
                    </Typography.Link>
                  </li>
                );
              })}
              MoreState={record.courseRoadmaps?.map(item => {
                return (
                  <li key={item.id}>
                    <Typography.Link onClick={() => onViewRoadMap?.(item)}>
                      {item.name} ({item.code})
                    </Typography.Link>
                  </li>
                );
              })}
            />
          </ul>
        );
      },
    },
    {
      width: 200,
      title: t('course:status'),
      render: (_, record) => {
        return (
          <Tag color={CourseStatusMappingToColors[record.status]}>{CourseStatusMappingToLabels[record.status]}</Tag>
        );
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('course:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('course:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('course:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '3',
                label: t('course:delete'),
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
      <TableListing<Course>
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
            textToHighlight={t('course:total_records_selected', {
              total: selectedRows.length,
            })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button danger onClick={() => onDeleteMany?.(selectedRows)}>
            {t('course:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
